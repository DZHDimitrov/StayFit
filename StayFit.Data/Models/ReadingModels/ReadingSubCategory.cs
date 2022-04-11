namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Common;
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ReadingSubCategory : BaseDeletableModel<int>
    {
        public ReadingSubCategory()
        {
            this.Readings = new HashSet<Reading>();
        }

        [StringLength(ReadingConstants.Constraints.ReadingCategoryMaxLength)]
        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [ForeignKey(nameof(ReadingMainCategory))]
        public int ReadingMainCategoryId { get; set; }

        public ReadingMainCategory ReadingMainCategory { get; set; }

        public ICollection<Reading> Readings { get; set; }
    }
}
