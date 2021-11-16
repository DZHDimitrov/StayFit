namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;
    using StayFit.Services.Providers.Interfaces;
    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.SharedModels.Responses;

    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IReadingService readingService;

        public ArticlesController(
            IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadArticles()
        {
            var response = await this.readingService.LoadReadingsByMainCategory("articles");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("latest")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadLatestArticles()
        {
            var response =await this.readingService.LoadLatestReadings("articles");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{searchName}")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadSingleArticle(string searchName)
        {
            var response =  await this.readingService.LoadReadingBySearchName(null,searchName);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateNewArticle(AddReadingRequest model)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var response = await this.readingService.CreateReading(model);
            return response.ToApiResponse();
        }

        [HttpPut]
        public IActionResult EditArticleById()
        {
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteArticleById()
        {
            return Ok();
        }
    }
}
