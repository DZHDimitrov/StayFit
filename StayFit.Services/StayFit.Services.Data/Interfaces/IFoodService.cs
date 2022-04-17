using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.Food.Requests;

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

        public Task<string> CreateFood(CreateFoodModel model);

        public Task<FoodEditedModel> EditFoodById(int foodId,EditFoodModel model);

        public Task<string> DeleteFoodById(int foodId);

        public Task<IEnumerable<FoodPreviewModel>> Search(string text);
    }
}
