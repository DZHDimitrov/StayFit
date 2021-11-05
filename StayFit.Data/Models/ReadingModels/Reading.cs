namespace StayFit.Data.Models.ReadingModels
{
    using StayFit.Data.Common.Models;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Reading : BaseDeletableModel<int>
    {
        public Reading()
        {
            this.UserReadings = new HashSet<UserReading>();
        }

        public string SearchTitle { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey(nameof(ReadingMainCategory))]
        public int ReadingMainCategoryId { get; set; }

        public ReadingMainCategory ReadingMainCategory { get; set; }

        [ForeignKey(nameof(ReadingSubCategory))]
        public int? ReadingSubCategoryId { get; set; }

        public ReadingSubCategory ReadingSubCategory { get; set; }

        [ForeignKey(nameof(BodyPart))]
        public int? BodyPartId { get; set; }
        public BodyPart BodyPart {get;set;}

        public ICollection<UserReading> UserReadings { get; set; }
    }
}
