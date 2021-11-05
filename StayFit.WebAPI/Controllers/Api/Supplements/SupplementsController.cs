using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.SharedModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Supplements
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplementsController : ControllerBase
    {
        private readonly IReadingService readingService;

        public SupplementsController(IReadingService readingService)
        {
            this.readingService = readingService;
        }

        [HttpGet]
        public IEnumerable<ReadingSubCategoryModel> LoadSubCategories()
        {
            return this.readingService.GetSubCategoriesByMainCategory("supplements");
        }

        [HttpGet]
        [Route("latest")]
        public IEnumerable<ReadingSubCategoryModel> LoadLatestSubCategories()
        {
            return this.readingService.GetLatestSubCategories("supplements");
        }

        [HttpGet]
        [Route("{subcategory}")]
        public IEnumerable<ReadingModel> LoadReadingsBySubCategory(string subcategory)
        {
            return this.readingService.GetReadingsBySubCategory("supplements",subcategory);
        }

        [HttpGet]
        [Route("{subcategory}/{searchName}")]
        public ReadingModel LoadReading(string subcategory,string searchName)
        {
            return this.readingService.GetReadingBySearchName(subcategory,searchName);
        }

        [HttpPost]
        public IActionResult CreateSupplement(CreateReading model)
        {
            this.readingService.CreateReading(model);
            return Ok();
        }
    }
}
