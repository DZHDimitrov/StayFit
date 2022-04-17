namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using StayFit.Common;
    using StayFit.Infrastructure.Extensions;
    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.Nutritions.Food.Requests;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : BaseController
    {
        private readonly IFoodService foodService;

        public FoodsController(IFoodService foodService)
        {
            this.foodService = foodService;
        }

        //checked
        [HttpGet]
        [Route("categories")]
        public async Task<ApiResponse<IEnumerable<FoodCategoryModel>>> LoadCategories()
        {
            var response =  await foodService.LoadFoodCategories();

            return response.ToApiResponse();
        }

        //checked
        [HttpPost]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        public async Task<ApiResponse<string>> CreateFood([FromForm] CreateFoodModel model)
        {
            var response = await foodService.CreateFood(model);

            return response.ToApiResponse();
        }

        //checked
        [HttpPut]
        [Authorize(Roles = UserConstants.Roles.Administrator + "," + UserConstants.Roles.Moderator)]
        [Route("{foodId}")]
        public async Task<ApiResponse<FoodEditedModel>> EditFoodById(int foodId, EditFoodModel model)
        {
            var response = await foodService.EditFoodById(foodId, model);

            return response.ToApiResponse();
        }

        [HttpDelete]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        [Route("{foodId}")]
        public async Task<ApiResponse<string>> DeleteFoodById(int foodId)
        {
            var response = await foodService.DeleteFoodById(foodId);

            return response.ToApiResponse();
        }

        //checked
        [HttpGet]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        [Route("{categoryId}/types")]
        public async Task<ApiResponse<IEnumerable<FoodTypeModel>>> LoadFoodTypesByCategoryId(string categoryId)
        {
            var response = await this.foodService.LoadFoodTypesByCategoryId(categoryId);

            return response.ToApiResponse();
        }

        //checked
        [HttpGet]
        [Route("{category}/previews")]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> LoadFoodPreviewsByCategory(string category)
        {
            var response = await this.foodService.LoadFoodPreviewsByCategory(category);

            return response.ToApiResponse();
        }

        //checked
        [HttpGet]
        [Route("{foodId}")]
        public async Task<ApiResponse<FoodModel>> LoadFoodById(int foodId)
        {
            var response = await this.foodService.LoadFoodById(foodId);

            return response.ToApiResponse();
        }

        //checked
        [HttpGet]
        [Route("search")]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> FoodSearch([FromQuery] string text)
        {
            var response = await this.foodService.Search(text);

            return response.ToApiResponse();
        }
    }
}
