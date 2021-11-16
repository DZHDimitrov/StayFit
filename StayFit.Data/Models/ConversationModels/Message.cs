namespace StayFit.Data.Models.ConversationModels
{
    using StayFit.Data.Common.Models;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Message : BaseDeletableModel<string>
    {
        public string SenderId { get; set; }
        public ApplicationUser Sender { get; set; }

        public string ReceieverId { get; set; }

        public ApplicationUser Receiver { get; set; }

        public string Content { get; set; }
    }
}
