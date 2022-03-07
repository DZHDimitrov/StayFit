namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Reading : BaseDeletableModel<int>
    {
        public Reading()
        {
            this.UserReadings = new HashSet<UserReading>();
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [ForeignKey(nameof(ReadingMainCategory))]
        public int ReadingMainCategoryId { get; set; }

        public ReadingMainCategory ReadingMainCategory { get; set; }

        [ForeignKey(nameof(ReadingSubCategory))]
        public int? ReadingSubCategoryId { get; set; }

        public ReadingSubCategory ReadingSubCategory { get; set; }

        //Creator
        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<UserReading> UserReadings { get; set; }
    }
}
