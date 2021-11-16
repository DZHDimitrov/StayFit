namespace StayFit.WebAPI.Controllers.Api.Conversations
{

    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.Conversations.PostModels;
    using StayFit.Shared.Conversations.Responses;

    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : BaseController
    {
        private readonly IConversationService conversationService;

        public ConversationsController(IConversationService conversationService)
        {
            this.conversationService = conversationService;
        }

        [HttpGet]
        [Route("messages")]
        public async Task<ApiResponse<LoadReceivedMessagesResponse>> LoadSentMessages([FromQuery]string msgType)
        {
            string userId = this.User.GetId();
            var response = await this.conversationService.LoadReceivedMessagesByUserId(msgType,userId);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<SendMessageResponse>> SendMessage(SendMessageModel model)
        {
            var userId = this.User.GetId();
            var response = await this.conversationService.SendMessage(model,userId);
            return response.ToApiResponse();
        }
    }
}
