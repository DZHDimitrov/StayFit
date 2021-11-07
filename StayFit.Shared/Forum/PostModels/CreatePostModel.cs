namespace StayFit.Shared.Forum.PostModels
{
    using System.ComponentModel.DataAnnotations;
    public class CreatePostModel
    {
        public int PostSubCategoryId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
