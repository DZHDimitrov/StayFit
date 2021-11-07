namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Mvc;
    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
    using System.Collections.Generic;
    using System.Threading.Tasks;

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
        public async Task<IEnumerable<FoodCategoryModel>> LoadCategories()
        {
            return await this.foodService.LoadFoodCategories();
        }

        [HttpPost]
        public IActionResult CreateFood(CreateFoodModel model)
        {
            this.foodService.CreateNewFood(model);
            return Ok("Created!");
        }

        [HttpGet]
        [Route("{categoryId}")]
        public async Task<IEnumerable<SingleFoodCategoryModel>> LoadFoodByCategoryId(int categoryId)
        {
            return await this.foodService.LoadFoodByCategory(categoryId);
        }

        [HttpGet]
        [Route("{categoryId}/{foodId}")]
        public ActionResult<FoodModel> LoadFood(int categoryId, int foodId)
        {
            return this.foodService.GetSingleFood(categoryId, foodId);
        }

        [HttpGet]
        [Route("nutrients")]
        public async Task<IEnumerable<NutrientModel>> LoadNutrients()
        {
            return await this.foodService.LoadNutrients();
        }
    }
}
