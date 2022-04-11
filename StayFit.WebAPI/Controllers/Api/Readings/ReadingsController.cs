using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StayFit.Common;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.Readings.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Readings
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingsController : BaseController
    {
        private readonly IReadingService readingService;

        public ReadingsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        [Route("categories")]
        public async Task<ApiResponse<IEnumerable<ReadingCategoryModel>>> LoadCategories([FromQuery] int? mainId)
        {
            var response = await this.readingService.LoadCategories(mainId);

            return response.ToApiResponse();
        }

        [HttpPost]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        public async Task<ApiResponse<AddReadingResponse>> CreateReading([FromForm] AddReadingRequest model)
        {
            var response = await this.readingService.CreateReading(model);

            return response.ToApiResponse();
        }

        [HttpDelete]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        [Route("{readingId}")]
        public async Task<ApiResponse<ReadingDeleteResponse>> DeleteReadingById(int readingId)
        {
            var response = await this.readingService.DeleteReading(readingId);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("latest")]
        public async Task<ApiResponse<KnowledgeModel>> LoadKnowledge()
        {
            var response = await this.readingService.LoadKnowledge();

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ApiResponse<MainCategoryWithPreviewsModel>> LoadPreviewsByMainCategory(string category)
        {
            var response = await this.readingService.LoadMainCategoryWithPreviews(category);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}/{subcategory}")]
        public async Task<ApiResponse<SubCategoryWithPreviewsModel>> LoadSubCategoryWithPreviews(string category,string subcategory)
        {
            var response = await this.readingService.LoadSubCategoryWithPreviews(category, subcategory);

            return response.ToApiResponse();
        }

        //[HttpGet]
        //[Route("id/{category}")]
        //public async Task<ApiResponse<ReadingModel>> LoadReading(string category, [FromQuery]string subCategory, [FromQuery]int? id)
        //{
        //    var response = await this.readingService.LoadReading(category, subCategory,id);

        //    return response.ToApiResponse();
        //}

        [HttpGet]
        [Route("reading")]
        public async Task<ApiResponse<ReadingModel>> LoadReading([FromQuery] int id)
        {
            var response = await this.readingService.LoadReading(id);

            return response.ToApiResponse();
        }
    }
}
