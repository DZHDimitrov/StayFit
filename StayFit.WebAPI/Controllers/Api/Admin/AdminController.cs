namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared.Nutritions.Food.Requests;
    using StayFit.Shared.Nutritions.Food.Responses;
    using System.Collections.Generic;

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
        [Route("new-food/{categoryId}")]
        public IEnumerable<FoodTypeModel> GetFoodTypesByCategory(int categoryId)
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
