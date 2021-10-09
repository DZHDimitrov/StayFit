using StayFit.Shared.Nutritions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface INutritionService
    {
        public IEnumerable<FoodCategoryModel> GetFoodCategories();

        public IEnumerable<SingleCategoryFoodModel> GetAllFoodByCategory(int id);

        public SingleFoodModel GetSingleFood(int foodCategory,int foodId);

        public void CreateNewFood(CreateNewFoodModel model);

        public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

        public IEnumerable<NutrientModel> GetNutrients();
    }
}
