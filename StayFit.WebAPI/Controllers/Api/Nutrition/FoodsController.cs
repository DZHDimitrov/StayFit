

namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Mvc;
    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly IFoodService foodService;

        public FoodsController(IFoodService foodService)
        {
            this.foodService = foodService;
        }

        [HttpGet]
        public IEnumerable<FoodCategoryModel> LoadCategories()
        {
            return this.foodService.GetFoodCategories();
        }

        [HttpPost]
        public IActionResult CreateFood(CreateFoodModel model)
        {
            this.foodService.CreateNewFood(model);
            return Ok("Created!");
        }

        [HttpGet]
        [Route("{categoryId}")]
        public IEnumerable<SingleFoodCategoryModel> LoadFoodByCategoryId(int categoryId)
        {
            return this.foodService.GetAllFoodByCategory(categoryId);
        }

        [HttpGet]
        [Route("{categoryId}/{foodId}")]
        public ActionResult<FoodModel> LoadFood(int categoryId, int foodId)
        {
            return this.foodService.GetSingleFood(categoryId, foodId);
        }

        [HttpGet]
        [Route("nutrients")]
        public IEnumerable<NutrientModel> LoadNutrients()
        {
            return this.foodService.GetNutrients();
        }
    }
}
