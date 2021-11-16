using Microsoft.EntityFrameworkCore;

using StayFit.Common;

using StayFit.Data;
using StayFit.Data.Models.ConversationModels;

using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared.Conversations;
using StayFit.Shared.Enums;
using StayFit.Shared.Conversations.PostModels;
using StayFit.Shared.Conversations.Responses;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ConversationService : IConversationService
    {
        private readonly AppDbContext dbContext;

        public ConversationService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<LoadReceivedMessagesResponse> LoadReceivedMessagesByUserId(string msgTypeFromQuery,string userId)
        {
            if (msgTypeFromQuery == null)
            {
                throw new ArgumentException();
            }
            var msgTypeAsString = msgTypeFromQuery.Substring(0, 1).ToUpper() + msgTypeFromQuery.Substring(1).ToLower();
            MessageType msgType;

            if (!Enum.TryParse<MessageType>(msgTypeAsString, out msgType))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND,"message type"));
            }

            IEnumerable<MessageModel> messages = null;

            if (msgType == MessageType.Received)
            {
                messages = await this.dbContext.Messages
                    .Where(m => m.ReceieverId.ToLower() == userId.ToLower())
                    .Select(m => new MessageModel 
                    {
                       Id = m.Id,
                       Content = m.Content,
                       SenderId = m.SenderId,
                       SenderName = m.Sender.UserName,
                       MessageType = msgType.ToString(),
                       Time = m.CreatedOn
                    })
                    .ToListAsync();
            }
            else if(msgType == MessageType.Sent)
            {
                messages = await this.dbContext.Messages
                    .Where(m => m.SenderId.ToLower() == userId.ToLower())
                    .Select(m => new MessageModel
                    {
                        Id = m.Id,
                        Content = m.Content,
                        ReceiverId = m.ReceieverId,
                        ReceiverName = m.Receiver.UserName,
                        MessageType = msgType.ToString(),
                        Time = m.CreatedOn
                    })
                    .ToListAsync();
            }

            return new LoadReceivedMessagesResponse
            {
                Messages = messages,
            };
        }

        public async Task<SendMessageResponse> SendMessage(SendMessageModel model,string senderId)
        {
            var receiver = await this.dbContext.Users.Include(u=>u.RecievedMessages).FirstOrDefaultAsync(u => u.Id == model.ReceiverId);
            if (receiver == null)
            {
                throw new ArgumentException(GlobalConstants.ITEM_NOT_FOUND, "user");
            }
            var message = new Message
            {
                Id = Guid.NewGuid().ToString(),
                Content = model.Content,
                SenderId = senderId,
                ReceieverId = model.ReceiverId,
                CreatedOn = DateTime.UtcNow.AddHours(2),
                IsDeleted = false,
            };

            await this.dbContext.Messages.AddAsync(message);
            await this.dbContext.SaveChangesAsync();
            return new SendMessageResponse
            {
                MessageId = message.Id,
                ReceverId = message.ReceieverId,
                ReceiverName = message.Receiver.UserName,
            };
        }
    }
}
