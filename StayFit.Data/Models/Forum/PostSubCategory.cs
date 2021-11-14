namespace StayFit.Data.Models.Forum
{
    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations.Schema;

    [Table("PostSubCategories", Schema = "Forum")]
    public class PostSubCategory
    {
        public PostSubCategory()
        {
            this.Posts = new HashSet<Post>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(PostMainCategory))]
        public int PostMainCategoryId { get; set; }

        public PostMainCategory PostMainCategory { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
