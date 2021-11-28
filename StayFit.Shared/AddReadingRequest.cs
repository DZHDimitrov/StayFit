using System;

namespace StayFit.Shared
{
    public class AddReadingRequest
    {
        public int ReadingMainCategoryId { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public int? ReadingSubCategoryId { get; set; }

        public int? BodyPartId { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}
