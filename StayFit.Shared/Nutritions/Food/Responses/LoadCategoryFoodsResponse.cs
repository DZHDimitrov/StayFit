namespace StayFit.Shared.Nutritions.Food.Responses
{

    using System.Collections.Generic;

    public class LoadCategoryFoodsResponse
    {
        public IEnumerable<CategoryFoodModel> CategoryFoods { get; set; }
    }
}
