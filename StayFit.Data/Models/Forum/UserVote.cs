using System.ComponentModel.DataAnnotations.Schema;

namespace StayFit.Data.Models.Forum
{
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
