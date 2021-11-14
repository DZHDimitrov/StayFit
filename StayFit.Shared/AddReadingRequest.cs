namespace StayFit.Shared
{
    public class AddReadingRequest
    {
        public int MainGroupId { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public SubGroup SubGroup { get; set; }
    }
}
