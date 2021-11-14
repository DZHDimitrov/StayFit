namespace StayFit.Data.Models.Forum
{

    using StayFit.Data.Common.Models;

    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Votes",Schema = "Forum")]
    public class Vote : BaseDeletableModel<string>
    {
        [ForeignKey(nameof(Comment))]
        public string CommentId { get; set; }
        public Comment Comment { get; set; }

        public bool IsLike { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

    }
}
