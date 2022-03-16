using StayFit.Data.Common.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StayFit.Data.Models.ProgerssModels
{
    public class Measurement : BaseDeletableModel<string>
    {
        [Column(TypeName="date")]
        public DateTime DateOfMeasurment { get; set; }

        public double? Weight { get; set; }

        public double? Height { get; set; }

        public double? Fats { get; set; }

        public double? Neck { get; set; }

        public double? Shoulders { get; set; }

        public double? Chest { get; set; }

        public double? LeftArm { get; set; }

        public double? RightArm { get; set; }

        public double? LeftForearm { get; set; }

        public double? RightForearm { get; set; }

        public double? Waist { get; set; }

        public double? Wrist { get; set; }

        public double? Hips { get; set; }

        public double? LeftThigh { get; set; }

        public double? RightThigh { get; set; }

        public double? LeftCalf { get; set; }

        public double? RightCalf { get; set; }

        public double? Ankle { get; set; }

        [Required]
        [ForeignKey(nameof(ApplicationUser))]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
