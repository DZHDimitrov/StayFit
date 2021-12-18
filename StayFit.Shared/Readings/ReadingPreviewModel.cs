namespace StayFit.Shared.Readings
{
    public class ReadingPreviewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string SearchName { get; set; }

        public string ImageUrl { get; set; }

        public bool HasChildren { get; set; }

        public string MainCategoryName { get; set; }
    }
}
