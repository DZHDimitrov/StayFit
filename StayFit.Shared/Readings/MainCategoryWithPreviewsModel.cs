namespace StayFit.Shared.Readings
{

    using System.Collections.Generic;

    public class MainCategoryWithPreviewsModel
    {
        public string Title { get; set; }

        public bool HasSubGroups { get; set; }

        public IEnumerable<string> CategoryNames { get; set; }

        public IEnumerable<ReadingPreviewModel> Previews { get; set; }
    }
}
