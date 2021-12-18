namespace StayFit.Shared.Readings
{

    using System.Collections.Generic;

    public class ReadingCategoryPreviewsModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool HasChildren { get; set; }

        public bool IsRoot { get; set; }

        public string SearchName { get; set; }

        public object[] Categories { get; set; }

        public IEnumerable<ReadingPreviewModel> Previews { get; set; }
    }
}
