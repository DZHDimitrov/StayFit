using Microsoft.AspNetCore.Mvc;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
using System.Collections.Generic;

namespace StayFit.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IFoodService foodService;

        public AdminController(IFoodService foodService)
        {
            this.foodService = foodService;
        }

        [HttpGet]
        [Route("/api/admin/new-food/{categoryId}")]
        public IEnumerable<FoodNameModel> GetFoodTypesByCategory(int categoryId)
        {
            //return this.foodService.GetFoodTypesByCategory(categoryId);
            return null;
        }

        [HttpPost]
        [Route("{new-food}")]
        public IActionResult CreateNewFood(CreateFoodModel model)
        {
            //this.foodService.CreateNewFood(model);
            //return Ok("Created!");
            return Ok();
        }
    }
}
