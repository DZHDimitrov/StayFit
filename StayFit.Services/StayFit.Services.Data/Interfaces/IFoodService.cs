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
        public Task<IEnumerable<FoodCategoryPreviewModel>> LoadFoodCategories();

        public Task<IEnumerable<FoodPreviewModel>> LoadFoodByCategory(string categoryName);

        public Task<IEnumerable<FoodKeywordModel>> LoadFoodKeywords(string searchedFood);

        public Task<IEnumerable<FoodPreviewModel>> Search(string text);

        public Task<FoodModel> LoadFoodById(int foodId);

        public Task<AddFoodResponse> CreateNewFood(CreateFoodModel model);

        public Task<IEnumerable<NutrientModel>> LoadNutrients();

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

    }
}
