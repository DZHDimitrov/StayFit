using Microsoft.AspNetCore.Http;

namespace StayFit.Shared.Readings.Requests
{
    public class EditReadingRequest
    {
        public int ReadingMainCategoryId { get; set; }

        public string Title { get; set; }

        public IFormFile Image { get; set; }

        public string Content { get; set; }

        public int? ReadingSubCategoryId { get; set; }
    }
}
