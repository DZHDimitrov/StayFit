using StayFit.Shared.Nutritions.Food.Requests;
using StayFit.Shared.Nutritions.Food.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public Task<IEnumerable<FoodCategoryModel>> LoadFoodCategories();

        public Task<IEnumerable<FoodPreviewModel>> LoadFoodPreviewsByCategory(string category);

        public Task<IEnumerable<FoodTypeModel>> LoadFoodTypesByCategoryId(string categoryId);

        public Task<FoodModel> LoadFoodById(int foodId);

        public Task<FoodCreatedModel> CreateFood(CreateFoodModel model);

        public Task<FoodEditedModel> EditFoodById(int foodId,EditFoodModel model);

        public Task<IEnumerable<FoodKeywordModel>> LoadSearchKeywords(string searchedFood);

        public Task<IEnumerable<FoodPreviewModel>> Search(string text);
    }
}
