namespace StayFit.Data.Models.Forum
{

    using System.ComponentModel.DataAnnotations.Schema;

    [Table("UserLikes", Schema = "Forum")]
    public class UserVote
    {
        [ForeignKey(nameof(Vote))]
        public string VoteId { get; set; }

        public Vote Vote { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
