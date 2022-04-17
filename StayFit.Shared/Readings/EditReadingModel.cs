namespace StayFit.Shared.Readings
{
    public class EditReadingModel
    {
        public int MainCategoryId { get; set; }

        public int? SubCategoryId { get; set; }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ImageUrl { get; set; }
    }
}
