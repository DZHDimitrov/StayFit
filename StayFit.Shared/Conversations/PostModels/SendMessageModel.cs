namespace StayFit.Shared.Conversations.PostModels
{

    using System;

    public class SendMessageModel
    {
        public string ReceiverId { get; set; }

        public string ReceiverName { get; set; }

        public string Content { get; set; }
    }
}
