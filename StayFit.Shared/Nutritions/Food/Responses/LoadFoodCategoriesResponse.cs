using System.Collections.Generic;

namespace StayFit.Shared.Nutritions.Food.Responses
{
    public class LoadFoodCategoriesResponse
    {
        public IEnumerable<FoodCategoryModel> FoodCategories { get; set; }
    }
}
