using StayFit.Shared.Nutritions.Food.PostModels;
using StayFit.Shared.Nutritions.Food.Responses;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public Task<LoadFoodCategoriesResponse> LoadFoodCategories();

        public Task<LoadCategoryFoodsResponse> LoadFoodByCategory(int id);

        public Task<LoadFoodResponse> GetSingleFood(int foodCategory, int foodId);

        public Task<AddFoodResponse> CreateNewFood(CreateFoodModel model);

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

        public Task<LoadNutrientsResponse> LoadNutrients();
    }
}
