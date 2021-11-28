namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using StayFit.Infrastructure.Extensions;
    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using StayFit.Shared;
    using StayFit.Shared.SharedModels.Responses;

    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : BaseController
    {
        private readonly IReadingService readingService;
        private readonly ILogger<ArticlesController> logger;

        public ArticlesController(
            IReadingService readingService,
            ILogger<ArticlesController> _logger)
        {
            this.readingService = readingService;
            logger = _logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadArticles()
        {
            var response = await this.readingService.LoadByMainCategory("articles");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("latest")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadLatestArticles()
        {
            var response =await this.readingService.LoadLatest("articles");
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{searchName}")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingResponse>> LoadSingleArticle(int searchName)
        {
            var response =  await this.readingService.LoadReadingByIdInSubGroup(null,null,searchName);
            return response.ToApiResponse();
        }

        [HttpPost]
        [AllowAnonymous]
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
        [Route("{articleId}")]
        [AllowAnonymous]
        public async Task<ApiResponse<ReadingDeleteResponse>> DeleteArticleById(int articleId)
        {
            var response = await this.readingService.DeleteReading(articleId);
            return response.ToApiResponse();
        }
    }
}
