using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.Food.PostModels;
using StayFit.Shared.Nutritions.Food.Requests;
using StayFit.Shared.Nutritions.Food.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public Task<IEnumerable<FoodCategoryPreviewModel>> LoadFoodCategories();

        public Task<IEnumerable<FoodPreviewModel>> LoadFoodsByCategory(string category);

        public Task<IEnumerable<FoodNameModel>> LoadFoodTypesByCategoryId(string categoryId);

        public Task<FoodModel> LoadFoodById(int foodId);

        public Task<AddFoodResponse> CreateFood(CreateFoodModel model);

        public Task<object> EditFoodById(int foodId,EditFoodModel model);

        public Task<IEnumerable<FoodKeywordModel>> LoadSearchKeywords(string searchedFood);

        public Task<IEnumerable<FoodPreviewModel>> Search(string text);


        public Task<IEnumerable<NutrientModel>> LoadNutrients();


        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

    }
}
