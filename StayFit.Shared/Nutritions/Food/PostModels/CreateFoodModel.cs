namespace StayFit.Shared.Nutritions.NutrientModels.RedoFoods
{
    using StayFit.Shared.Nutritions.Food;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class CreateFoodModel
    {
        [Required]
        [MinLength(3)]
        public string Description { get; set; }

        [Required]
        public int FoodNameId { get; set; }

        [Required]
        public double Calories { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public int FoodCategoryId { get; set; }

        public IEnumerable<NutrientModel> FoodNutrientModels { get; set; }
    }
}
