﻿namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Common;
    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.FoodModels.Nutrients;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Food : BaseDeletableModel<int>
    {

        public Food()
        {
            this.FoodSubNutrients = new HashSet<FoodSubNutrient>();
            this.FoodBaseNutrients = new HashSet<FoodBaseNutrient>();
        }

        [StringLength(FoodConstants.Constraints.DescriptionMaxLength)]
        public string Description { get; set; }

        [ForeignKey(nameof(FoodType))]
        public int FoodTypeId { get; set; }

        public FoodType FoodType { get; set; }

        [ForeignKey(nameof(FoodCategory))]
        public int FoodCategoryId { get; set; }
        public FoodCategory FoodCategory { get; set; }

        [Range(FoodConstants.Constraints.MinCalories,FoodConstants.Constraints.MaxCalories)]
        public double Calories { get; set; }

        [Required]
        [StringLength(GlobalConstants.Constraints.ImageMaxLength)]
        public string ImageUrl { get; set; }

        public ICollection<FoodSubNutrient> FoodSubNutrients { get; set; }

        public ICollection<FoodBaseNutrient> FoodBaseNutrients { get; set; }
    }
}
