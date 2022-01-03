namespace StayFit.Shared.Nutritions.Food.PostModels
{
    using StayFit.Shared.Nutritions.Food;
    using System.Collections.Generic;

    public class CreateFoodModel
    {

        public string Description { get; set; }

        public int FoodNameId { get; set; }

        public double Calories { get; set; }

        public string ImageUrl { get; set; }

        public int FoodCategoryId { get; set; }

        public int SubNutrientId { get; set; }

        public IEnumerable<NutrientModel> FoodNutrientModels { get; set; }

    }
}
