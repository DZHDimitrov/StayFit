namespace StayFit.Shared.Conversations.Responses
{

    using System.Collections.Generic;

    public class LoadReceivedMessagesResponse
    {
        public IEnumerable<MessageModel> Messages { get; set; }
    }
}
