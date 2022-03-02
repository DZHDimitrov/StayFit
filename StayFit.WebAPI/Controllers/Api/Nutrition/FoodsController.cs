namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.Nutritions.Food.Requests;
    using StayFit.Shared.Nutritions.Food.Responses;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class FoodsController : BaseController
    {
        private readonly IFoodService foodService;

        public FoodsController(IFoodService foodService)
        {
            this.foodService = foodService;
        }

        [HttpGet]
        [Route("categories")]
        public async Task<ApiResponse<IEnumerable<FoodCategoryModel>>> LoadCategories()
        {
            var response =  await this.foodService.LoadFoodCategories();

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> LoadFoodPreviewsByCategory(string category)
        {
            var response = await this.foodService.LoadFoodPreviewsByCategory(category);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{categoryId}/types")]
        public async Task<ApiResponse<IEnumerable<FoodTypeModel>>> LoadFoodTypesByCategoryId(string categoryId)
        {
            var response = await this.foodService.LoadFoodTypesByCategoryId(categoryId);

            return response.ToApiResponse();
        }


        [HttpPost]
        public async Task<ApiResponse<FoodCreatedModel>> CreateFood([FromForm] CreateFoodModel model)
        {
            var response = await this.foodService.CreateFood(model);

            return response.ToApiResponse();
        }


        [HttpGet]
        [Route("id/{foodId}")]
        public async Task<ApiResponse<FoodModel>> LoadFoodById(int foodId)
        {
            var response = await this.foodService.LoadFoodById(foodId);

            return response.ToApiResponse();
        }

        [HttpPut]
        [Route("id/{foodId}")]
        public async Task<ApiResponse<FoodEditedModel>> EditFoodById(int foodId,EditFoodModel model)
        {
            var response = await this.foodService.EditFoodById(foodId, model);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("search/keywords")]
        public async Task<ApiResponse<IEnumerable<FoodKeywordModel>>> LoadSearchKeywords([FromQuery] string food)
        {
            var response = await this.foodService.LoadSearchKeywords(food);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("search")]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> FoodSearch([FromQuery] string text)
        {
            var response = await this.foodService.Search(text);

            return response.ToApiResponse();
        }
    }
}
