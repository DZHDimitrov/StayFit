using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StayFit.Data.Models;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticlesController(
            IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpGet]
        public IEnumerable<ArticleModel> GetAllArticles()
        {
            return this.articleService.GetAllArticles();
        }

        [HttpGet]
        [Route("{latest}")]
        public IEnumerable<ArticleModel> GetLatestArticles()
        {
            return this.articleService.GetLatestArticles();
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

        [HttpPost]
        public IActionResult CreateNewArticle([FromBody] CreateArticleRequestModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            this.articleService.CreateArticle(userId, model);
            return Ok();
        }
    }
}
