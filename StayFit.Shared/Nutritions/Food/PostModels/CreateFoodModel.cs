namespace StayFit.Shared.Nutritions.Food.PostModels
{
    using StayFit.Shared.Nutritions.Food;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class CreateFoodModel
    {

        public string Description { get; set; } = "test";

        public int FoodNameId { get; set; } = 5;

        public double Calories { get; set; } = 250;

        public string ImageUrl { get; set; } = "Testpic";

        public int FoodCategoryId { get; set; } = 2;

        public IEnumerable<NutrientModel> FoodNutrientModels { get; set; }

        public int SubNutrientId { get; set; } = 1;
    }
}
