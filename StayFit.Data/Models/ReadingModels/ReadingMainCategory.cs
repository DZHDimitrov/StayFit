namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Common;
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ReadingMainCategory : BaseModel<int>
    {
        public ReadingMainCategory()
        {
            this.Readings = new HashSet<Reading>();
            this.ReadingSubCategories = new HashSet<ReadingSubCategory>();
        }

        [StringLength(ReadingConstants.Constraints.ReadingCategoryMaxLength)]
        [Required]
        public string Name { get; set; }

        public ICollection<Reading> Readings { get; set; }

        public ICollection<ReadingSubCategory> ReadingSubCategories { get; set; }
    }
}
