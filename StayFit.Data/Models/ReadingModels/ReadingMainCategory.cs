namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Data.Common.Models;
    using System.Collections.Generic;

    public class ReadingMainCategory : BaseDeletableModel<int>
    {
        public ReadingMainCategory()
        {
            this.Readings = new HashSet<Reading>();
            this.ReadingSubCategories = new HashSet<ReadingSubCategory>();
        }

        public string SearchName { get; set; }

        public string Name { get; set; }

        public ICollection<Reading> Readings { get; set; }

        public ICollection<ReadingSubCategory> ReadingSubCategories { get; set; }
    }
}
