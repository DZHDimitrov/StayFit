namespace StayFit.Data.Models.Forum
{
    using StayFit.Data.Common.Models;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Posts", Schema = "Forum")]
    public class Post : BaseDeletableModel<int>
    {
        public Post()
        {
            this.Comments = new HashSet<Comment>();
        }

        public string Title { get; set; }

        public string Content { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }


        [ForeignKey(nameof(PostSubCategory))]
        public int PostSubCategoryId { get; set; }

        public PostSubCategory PostSubCategory { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
