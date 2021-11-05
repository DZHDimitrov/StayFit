namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.FoodModels.Nutrients;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Food : BaseDeletableModel<int>
    {

        public Food()
        {
            this.FoodSubNutrients = new HashSet<FoodSubNutrient>();
            this.FoodBaseNutrients = new HashSet<FoodBaseNutrient>();
        }

        public string Description { get; set; }

        [ForeignKey(nameof(FoodNameId))]
        public int FoodNameId { get; set; }

        public FoodName FoodName { get; set; }

        [ForeignKey(nameof(FoodCategory))]
        public int FoodCategoryId { get; set; }
        public FoodCategory FoodCategory { get; set; }

        public double Calories { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<FoodSubNutrient> FoodSubNutrients { get; set; }

        public ICollection<FoodBaseNutrient> FoodBaseNutrients { get; set; }
    }
}
