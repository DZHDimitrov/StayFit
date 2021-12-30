using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.Food.PostModels;
using StayFit.Shared.Nutritions.Food.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public Task<IEnumerable<FoodCategoryModel>> LoadFoodCategories();

        public Task<IEnumerable<object>> LoadSearchedFood(string searchedFood);

        public Task<IEnumerable<CategoryFoodModel>> LoadFoodByCategory(string categoryName);

        public Task<FoodModel> GetSingleFood(int foodCategory, int foodId);

        public Task<AddFoodResponse> CreateNewFood(CreateFoodModel model);

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

        public Task<LoadNutrientsResponse> LoadNutrients();
    }
}
