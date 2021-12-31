namespace StayFit.Shared.Nutritions.Food
{

    using System.Collections.Generic;

    public class FoodModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Calories { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public IEnumerable<NutrientModel> Nutrients { get; set; }
    }
}
