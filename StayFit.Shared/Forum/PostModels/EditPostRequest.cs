namespace StayFit.Shared.Forum.PostModels
{
    using System.ComponentModel.DataAnnotations;
    public class EditPostRequest
    {
        public int PostSubCategoryId { get; set; }

        public int PostId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
