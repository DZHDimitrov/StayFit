using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IFoodService
    {
        public IEnumerable<FoodCategoryModel> GetFoodCategories();

        public IEnumerable<SingleFoodCategoryModel> GetAllFoodByCategory(int id);

        public FoodModel GetSingleFood(int foodCategory, int foodId);

        public void CreateNewFood(CreateFoodModel model);

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId);

        public IEnumerable<NutrientModel> GetNutrients();
    }
}
