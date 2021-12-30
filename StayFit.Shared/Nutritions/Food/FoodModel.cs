namespace StayFit.Shared.Nutritions.Food
{

    using System.Collections.Generic;

    public class FoodModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Calories { get; set; }

        public string Description { get; set; }

        public IEnumerable<NutrientModel> NutrientModels { get; set; }
    }
}
