namespace StayFit.Shared
{

    using Microsoft.AspNetCore.Http;

    public class AddReadingRequest
    {
        public int ReadingMainCategoryId { get; set; }

        public string Title { get; set; }

        public IFormFile Image { get; set; }

        public string Content { get; set; }

        public int? ReadingSubCategoryId { get; set; }
    }
}
