namespace StayFit.WebAPI.Controllers.Api.Nutrition
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.Nutritions.Food.PostModels;
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
        [AllowAnonymous]
        public async Task<ApiResponse<IEnumerable<FoodCategoryPreviewModel>>> LoadCategories()
        {
            var response =  await this.foodService.LoadFoodCategories();
            return response.ToApiResponse();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApiResponse<IEnumerable<FoodKeywordModel>>> LoadFoodKeywords([FromQuery] string food)
        {
            var response = await this.foodService.LoadFoodKeywords(food);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("search")]
        [AllowAnonymous]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> Search([FromQuery] string text)
        {
            var response = await this.foodService.Search(text);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddFoodResponse>> CreateFood(CreateFoodModel model)
        {
            //if (Enum.IsDefined(typeof(SubNutrientType),model.SubNutrientId))
            //{
            //    Console.WriteLine("Test");
            //}
            //SubNutrientType value = (SubNutrientType)model.SubNutrientId;
            //GetDisplayValue<SubNutrientType>(value);
            //return null;
            var response = await this.foodService.CreateNewFood(model);
            return response.ToApiResponse();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{categoryName}")]
        public async Task<ApiResponse<IEnumerable<FoodPreviewModel>>> LoadFoodByCategoryId(string categoryName)
        {
            var response =  await this.foodService.LoadFoodByCategory(categoryName);
            return response.ToApiResponse();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("id/{foodId}")]
        public async Task<ApiResponse<FoodModel>> LoadFood(int foodId)
        {
            var response = await this.foodService.LoadFoodById(foodId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("nutrients")]
        public async Task<ApiResponse<IEnumerable<NutrientModel>>> LoadNutrients()
        {
            var response = await this.foodService.LoadNutrients();
            return response.ToApiResponse();
        }
    }
}
