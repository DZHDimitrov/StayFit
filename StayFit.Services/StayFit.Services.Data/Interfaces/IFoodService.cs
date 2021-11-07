using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public Task<IEnumerable<FoodCategoryModel>> LoadFoodCategories();

        public Task<IEnumerable<SingleFoodCategoryModel>> LoadFoodByCategory(int id);

        public FoodModel GetSingleFood(int foodCategory, int foodId);

        public void CreateNewFood(CreateFoodModel model);

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

        public Task<IEnumerable<NutrientModel>> LoadNutrients();
    }
}
