namespace StayFit.Shared.Readings
{

    using System.Collections.Generic;

    public class ReadingPreviewsWithCategoryModel
    {
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public IEnumerable<ReadingPreviewModel> Previews { get; set; }

    }
}
