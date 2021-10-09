using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NutritionsController : ControllerBase
    {
        private readonly INutritionService nutritionService;

        public NutritionsController(INutritionService nutritionService)
        {
            this.nutritionService = nutritionService;
        }

        [HttpGet]
        [Route("categories")]
        public IEnumerable<FoodCategoryModel> GetAllFoodCategories()
        {
            return this.nutritionService.GetFoodCategories();
        }

        [HttpGet]
        [Route("categories/{categoryId}")]
        public IEnumerable<SingleCategoryFoodModel> GetAllFoodByCategory(int categoryId)
        {
            return this.nutritionService.GetAllFoodByCategory(categoryId);
        }

        [HttpGet]
        [Route("categories/{categoryId}/{foodId}")]
        public ActionResult<SingleFoodModel> GetSingleFood(int categoryId, int foodId)
        {
            return this.nutritionService.GetSingleFood(categoryId, foodId);
        }

        [HttpPost]
        public IActionResult CreateNewFood(CreateNewFoodModel model)
        {
            this.nutritionService.CreateNewFood(model);
            return Ok("Created!");
        }

        [HttpGet]
        [Route("nutrients")]
        public IEnumerable<NutrientModel> GetNutrients()
        {
            return this.nutritionService.GetNutrients();
        }




    }
}
