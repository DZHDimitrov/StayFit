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
        [AllowAnonymous]
        public async Task<ApiResponse<IEnumerable<ReadingCategoryModel>>> LoadCategories([FromQuery] int? mainId)
        {
            var response = await this.readingService.LoadCategories(mainId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ApiResponse<ReadingCategoryPreviewsModel>> LoadPreviewsByMainCategory(string category)
        {
            var response = await this.readingService.LoadPreviewsByMainCategory(category);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}/{subcategory}")]
        public async Task<ApiResponse<ReadingCategoryPreviewsModel>> LoadPreviewsBySubCategory(string category,string subcategory)
        {
            var response = await this.readingService.LoadPreviewsBySubCategory(category, subcategory);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("latest")]
        public async Task<ApiResponse<IEnumerable<ReadingCategoryPreviewsModel>>> LoadLatest()
        {
            var response = await this.readingService.LoadLatest();
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("single/{category}/{subcategory}/{id}")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingModel>> LoadReadingByIdInSubGroup(string category, string subcategory,int id)
        {
            var response = await this.readingService.LoadReadingByIdInSubGroup(category,  subcategory,id);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("single/{category}/{searchName}")]
        public async Task<ApiResponse<ReadingModel>> LoadReadingByMainCategory(string category,string searchName)
        {
            var response = await this.readingService.LoadReadingByMainCategory(category, searchName);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateReading([FromForm]AddReadingRequest model)
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
