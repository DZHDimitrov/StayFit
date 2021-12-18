﻿using Microsoft.AspNetCore.Authorization;
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
        public async Task<ApiResponse<IEnumerable<ReadingMainCategoryModel>>> LoadMainCategories()
        {
            var response = await this.readingService.LoadMainCategories();
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("subcategories")]
        public async Task<ApiResponse<IEnumerable<ReadingSubCategoryModel>>> LoadSubCategories([FromQuery] int mainId)
        {
            var response = await this.readingService.LoadSubCategories(mainId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}")]
        public async Task<ApiResponse<ReadingCategoryPreviewsModel>> LoadByMainCategory(string category)
        {
            var response = await this.readingService.LoadPreviewsByMainCategory(category);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("{category}/{subcategory}")]
        public async Task<ApiResponse<ReadingCategoryPreviewsModel>> LoadReadingsBySubCategory(string category,string subcategory)
        {
            var response = await this.readingService.LoadReadingsBySubCategory(category, subcategory);
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

        [Route("single/{category}/{searchName}")]
        public async Task<ApiResponse<ReadingModel>> LoadReadingByMainCategory(string category,string searchName)
        {
            var response = await this.readingService.LoadReadingBySearchNameInMainCategory(category, searchName);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddReadingResponse>> CreateReading(AddReadingRequest model)
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