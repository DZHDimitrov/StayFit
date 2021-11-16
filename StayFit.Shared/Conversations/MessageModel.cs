namespace StayFit.Shared.Conversations
{
    using System;

    public class MessageModel
    {
        public string Id { get; set; }

        public string Content { get; set; }

        public string MessageType { get; set; }

        public string ReceiverId { get; set; }
        public string ReceiverName { get; set; }

        public string SenderId { get; set; }
        public string SenderName { get; set; }

        public DateTime Time { get; set; }
    }
}
