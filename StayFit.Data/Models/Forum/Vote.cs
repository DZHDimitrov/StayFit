using StayFit.Data.Common.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StayFit.Data.Models.Forum
{
    [Table("Likes",Schema = "Forum")]
    public class Vote : BaseDeletableModel<string>
    {
        public Vote()
        {
            this.UserVotes = new HashSet<UserVote>();
        }

        [ForeignKey(nameof(Comment))]
        public string CommentId { get; set; }
        public Comment Comment { get; set; }

        public bool IsLike { get; set; }

        public ICollection<UserVote> UserVotes { get; set; }
    }
}
