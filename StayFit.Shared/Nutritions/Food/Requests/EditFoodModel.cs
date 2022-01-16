using System.Collections.Generic;

namespace StayFit.Shared.Nutritions.Food.Requests
{
    public class EditFoodModel
    {
        public double? Calories { get; set; }

        public IEnumerable<EditNutrientModel> Nutrients { get; set; }

        public IEnumerable<EditSubNutrientModel> SubNutrients { get; set; }
    }
}
