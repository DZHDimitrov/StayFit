namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.SharedModels.Responses;

    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class NutritionsController : BaseController
    {
        private readonly IReadingService readingService;

        public NutritionsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        public async Task<ApiResponse<ReadingSubCategoryResponse>> LoadSubCategories()
        {
            var response = await this.readingService.LoadSubCategoriesByMainCategory("nutrition");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("latest")]
        public async Task<ApiResponse<ReadingSubCategoryResponse>> LoadLatestSubCategories()
        {
            var response = await this.readingService.LoadLatestSubCategories("nutrition");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{subcategory}")]
        public async Task<ApiResponse<ReadingResponse>> LoadReadingsBySubCategory(string subcategory)
        {
            var response = await this.readingService.LoadReadingsBySubCategory("nutrition",subcategory);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{subcategory}/{searchName}")]
        public async Task<ApiResponse<ReadingResponse>> LoadReading(string subcategory,string searchName)
        {
            var response = await this.readingService.LoadReadingBySearchName(subcategory,searchName);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateNutrition(AddReadingRequest model)
        {
            var response = await this.readingService.CreateReading(model);
            return response.ToApiResponse();
        }
    }
}
