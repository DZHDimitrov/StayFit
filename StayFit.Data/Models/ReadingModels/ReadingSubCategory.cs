namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations.Schema;

    public class ReadingSubCategory : BaseDeletableModel<int>
    {
        public ReadingSubCategory()
        {
            this.Readings = new HashSet<Reading>();
            //this.ReadingSubCategories = new HashSet<ReadingSubCategory>();
        }

        public string SearchName { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey(nameof(ReadingMainCategory))]
        public int ReadingMainCategoryId { get; set; }

        public ReadingMainCategory ReadingMainCategory { get; set; }

        //public ReadingSubCategory Parent { get; set; }

        //public int? ParentId { get; set; }

        //public ICollection<ReadingSubCategory> ReadingSubCategories { get; set; }

        public ICollection<Reading> Readings { get; set; }
    }
}
