using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Readings
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class ReadingsController : BaseController
    {
        private readonly IReadingService readingService;

        public ReadingsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        [Route("categories")]
        public async Task<ApiResponse<IEnumerable<MainCategoryDto>>> LoadCategories()
        {
            var response = await this.readingService.LoadBaseCategories();
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ApiResponse<IEnumerable<ReadingPreviewModel>>> LoadByMainCategory(string category)
        {
            var response = await this.readingService.LoadPreviewsByMainCategory(category);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}/{subcategory}")]
        public async Task<ApiResponse<IEnumerable<ReadingModel>>> LoadReadingsBySubCategory(string category,string subcategory)
        {
            var response = await this.readingService.LoadReadingsBySubCategory(category, subcategory);
            return response.ToApiResponse();
        }

        [HttpPost]
        [Route("latest")]
        public async Task<ApiResponse<IEnumerable<LatestCategoryReadings>>> LoadLatest(string[] categories)
        {
            var response = await this.readingService.LoadLatest(categories);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}/single/{id}")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingModel>> LoadReadingByIdInSubGroup(string category, int id, [FromQuery] int? subCategory)
        {
            var response = await this.readingService.LoadReadingByIdInSubGroup(category,  id, subCategory);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateReading(AddReadingRequest model)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await this.readingService.CreateReading(model);
            return response.ToApiResponse();
        }

        [HttpDelete]
        [Route("{readingId}")]
        public async Task<ApiResponse<ReadingDeleteResponse>> DeleteReadingById(int readingId)
        {
            var response = await this.readingService.DeleteReading(readingId);
            return response.ToApiResponse();
        }
    }
}
