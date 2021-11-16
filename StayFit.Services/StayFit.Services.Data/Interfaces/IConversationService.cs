using StayFit.Shared.Conversations.PostModels;
using StayFit.Shared.Conversations.Responses;

using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IConversationService
    {
        public Task<LoadReceivedMessagesResponse> LoadReceivedMessagesByUserId(string msgTypeFromQuery, string userId);

        public Task<SendMessageResponse> SendMessage(SendMessageModel model,string senderId);
    }
}
