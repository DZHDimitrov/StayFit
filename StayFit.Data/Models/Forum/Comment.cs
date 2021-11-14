namespace StayFit.Data.Models.Forum
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Comments", Schema = "Forum")]
    public class Comment : BaseDeletableModel<string>
    {
        public Comment()
        {
            this.Votes = new HashSet<Vote>();
            this.UsersChosed = new HashSet<UsersChosenComments>();
        }

        public string Content { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        [ForeignKey(nameof(Post))]
        public int PostId { get; set; }

        public Post Post { get; set; }

        public ICollection<Vote> Votes { get; set; }

        public ICollection<UsersChosenComments> UsersChosed { get; set; }
    }
}
