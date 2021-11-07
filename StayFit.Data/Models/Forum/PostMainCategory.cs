namespace StayFit.Data.Models.Forum
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("PostMainCategories", Schema = "Forum")]
    public class PostMainCategory
    {
        public PostMainCategory()
        {
            this.PostSubCategories = new HashSet<PostSubCategory>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<PostSubCategory> PostSubCategories { get; set; }
    }
}
