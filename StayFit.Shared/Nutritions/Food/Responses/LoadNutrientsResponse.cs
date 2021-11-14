namespace StayFit.Shared.Nutritions.Food.Responses
{

    using System.Collections.Generic;

    public class LoadNutrientsResponse
    {
        public IEnumerable<NutrientModel> Nutrients { get; set; }
    }
}
