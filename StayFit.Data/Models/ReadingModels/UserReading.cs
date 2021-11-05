namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Data.Common.Models;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserReading : BaseDeletableModel<int>
    {

        public string ApplicationUserId { get; set; }

        public ApplicationUser User { get; set; }

        [ForeignKey(nameof(Reading))]
        public int ReadingId { get; set; }

        public Reading Reading { get; set; }
    }
}
