namespace StayFit.Data.Models.Forum
{

    using System.ComponentModel.DataAnnotations.Schema;


    [Table("UsersChosenComments",Schema = "Forum")]
    public class UsersChosenComments
    {
        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        [ForeignKey(nameof(Comment))]
        public string CommentId { get; set; }

        public Comment Comment { get; set; }
    }
}
