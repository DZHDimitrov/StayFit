namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.SharedModels.Responses;

    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsController : BaseController
    {
        private readonly IReadingService readingService;

        public TrainingsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        public async Task<ApiResponse<ReadingSubCategoryResponse>> LoadSubCategories()
        {
            //var response = await this.readingService.LoadSubCategoriesByMainCategory("training");
            //return response.ToApiResponse();
            return null;
        }

        [HttpGet]
        [Route("latest")]
        public async Task<ApiResponse<ReadingResponse>> LoadRecentSubCategories()
        {
            //var response = await this.readingService.LoadLatestSubCategories("training");
            //return response.ToApiResponse();
            return null;
        }

        [HttpGet]
        [Route("{subCategory}")]
        public async Task<ApiResponse<ReadingResponse>> LoadReadingsBySubCategory(string subCategory)
        {
            var response = await this.readingService.LoadReadingsBySubCategory("training", subCategory);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{subCategory}/{searchTitle}")]
        public async Task<ApiResponse<ReadingResponse>> LoadReading(string subCategory,int searchTitle)
        {
            var response = await this.readingService.LoadReadingByIdInSubGroup(subCategory,null, searchTitle);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("exercises/{bodyPart}")]
        public async Task<ApiResponse<ReadingResponse>> LoadExercises(string bodyPart)
        {
            var response = await this.readingService.LoadExerciseByBodyPart(bodyPart);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateTraining(AddReadingRequest model)
        {
            var response = await this.readingService.CreateReading(model);
            return response.ToApiResponse();
        }
    }
}
