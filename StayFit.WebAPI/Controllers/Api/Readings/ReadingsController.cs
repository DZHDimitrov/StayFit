using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using StayFit.Common;

using StayFit.Infrastructure.Extensions;

using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.Readings.Requests;
using StayFit.Shared.Readings.Responses;

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

        //checked
        [HttpGet]
        [Authorize(Roles = UserConstants.Roles.Administrator + "," + UserConstants.Roles.Moderator)]
        [Route("categories")]
        public async Task<ApiResponse<IEnumerable<ReadingCategoryModel>>> LoadCategories([FromQuery] int? mainId)
        {
            var response = await this.readingService.LoadCategories(mainId);

            return response.ToApiResponse();
        }

        //checked
        [HttpPost]
        [Authorize(Roles = UserConstants.Roles.Administrator)]
        public async Task<ApiResponse<AddReadingResponse>> CreateReading([FromForm] AddReadingRequest model)
        {
            var response = await this.readingService.CreateReading(model);

            return response.ToApiResponse();
        }

        //checked
        [HttpGet]
        [Route("{readingId}/edit")]
        [Authorize(Roles = UserConstants.Roles.Administrator + "," + UserConstants.Roles.Moderator)]
        public async Task<ApiResponse<EditReadingModel>> EditReading(int readingId)
        {
            var response = await this.readingService.LoadReadingForEdit(readingId);

            return response.ToApiResponse();
        }

        //checked
        [HttpPut]
        [Route("{readingId}/edit")]
        [Authorize(Roles = UserConstants.Roles.Administrator + "," + UserConstants.Roles.Moderator)]
        public async Task<ApiResponse<EditReadingResponse>> EditReading(int readingId,[FromForm]EditReadingRequest model)
        {
            var response = await this.readingService.EditReading(readingId, model);

            return response.ToApiResponse();
        }

        //checked
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
        [Route("categories/{category}")]
        public async Task<ApiResponse<MainCategoryWithPreviewsModel>> LoadPreviewsByMainCategory(string category)
        {
            var response = await this.readingService.LoadMainCategoryWithPreviews(category);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("categories/{category}/{subcategory}")]
        public async Task<ApiResponse<SubCategoryWithPreviewsModel>> LoadSubCategoryWithPreviews(string category,string subcategory)
        {
            var response = await this.readingService.LoadSubCategoryWithPreviews(category, subcategory);

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{readingId}")]
        public async Task<ApiResponse<ReadingModel>> LoadReading(int readingId)
        {
            var response = await this.readingService.LoadReading(readingId);

            return response.ToApiResponse();
        }
    }
}
