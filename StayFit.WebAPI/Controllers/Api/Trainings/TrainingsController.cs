namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared;
    using StayFit.Shared.SharedModels;
    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase
    {
        private readonly IReadingService readingService;

        public TrainingsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        public IEnumerable<ReadingSubCategoryModel> LoadSubCategories()
        {
            return this.readingService.GetSubCategoriesByMainCategory("training");
        }

        [HttpGet]
        [Route("latest")]
        public IEnumerable<ReadingSubCategoryModel> LoadRecentSubCategories()
        {
            return this.readingService.GetLatestSubCategories("training");
        }

        [HttpGet]
        [Route("{subCategory}")]
        public IEnumerable<ReadingModel> LoadReadingsBySubCategory(string subCategory)
        {
            return this.readingService.GetReadingsBySubCategory("training", subCategory);
        }

        [HttpGet]
        [Route("{subCategory}/{searchTitle}")]
        public ReadingModel LoadReading(string subCategory,string searchTitle)
        {
            return this.readingService.GetReadingBySearchName(subCategory, searchTitle);
        }

        [HttpGet]
        [Route("exercises/{bodyPart}")]
        public IEnumerable<ReadingModel> LoadExercises(string bodyPart)
        {
            return this.readingService.GetExerciseByBodyPart(bodyPart);
        }

        [HttpPost]
        public IActionResult CreateTraining([FromBody] CreateReading model)
        {
            this.readingService.CreateReading(model);
            return Ok();
        }
    }
}
