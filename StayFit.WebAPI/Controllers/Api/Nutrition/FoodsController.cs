namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.Nutritions.Food.PostModels;
    using StayFit.Shared.Nutritions.Food.Responses;

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApiResponse<LoadFoodCategoriesResponse>> LoadCategories()
        {
            var response =  await this.foodService.LoadFoodCategories();
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddFoodResponse>> CreateFood(CreateFoodModel model)
        {
            var response = await this.foodService.CreateNewFood(model);
            return response.ToApiResponse();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{categoryId}")]
        public async Task<ApiResponse<LoadCategoryFoodsResponse>> LoadFoodByCategoryId(int categoryId)
        {
            var response =  await this.foodService.LoadFoodByCategory(categoryId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{categoryId}/{foodId}")]
        public async Task<ApiResponse<LoadFoodResponse>> LoadFood(int categoryId, int foodId)
        {
            var response = await this.foodService.GetSingleFood(categoryId, foodId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("nutrients")]
        public async Task<ApiResponse<LoadNutrientsResponse>> LoadNutrients()
        {
            var response = await this.foodService.LoadNutrients();
            return response.ToApiResponse();
        }
    }
}
