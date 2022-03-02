namespace StayFit.Shared.Readings
{

    using System.Collections.Generic;

    public class KnowledgeModel
    {
        public string Title { get; set; }

        public IEnumerable<string> CategoryNames { get; set; }

        public IEnumerable<ReadingPreviewsWithCategoryModel> ReadingPreviewsWithCategory { get; set; }
    }
}
