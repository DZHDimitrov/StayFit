using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StayFit.Data.Models;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.SharedModels;
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
        private readonly IReadingService readingService;

        public ArticlesController(
            IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        public IEnumerable<ReadingModel> LoadArticles()
        {
            return this.readingService.GetReadingsByMainCategory("articles");
        }

        [HttpGet]
        [Route("latest")]
        public IEnumerable<ReadingModel> LoadLatestArticles()
        {
            return this.readingService.GetLatestReadings("articles");
        }

        [HttpGet]
        [Route("{searchName}")]
        public ReadingModel LoadSingleArticle(string searchName)
        {
            return this.readingService.GetReadingBySearchName(null,searchName);
        }

        [HttpPost]
        public IActionResult CreateNewArticle([FromBody] CreateReading model)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            this.readingService.CreateReading(model);
            return Ok();
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
