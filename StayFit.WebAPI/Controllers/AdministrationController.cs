using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly INutritionService nutritionService;

        public AdministrationController(INutritionService nutritionService)
        {
            this.nutritionService = nutritionService;
        }

        [HttpGet]
        [Route("/api/administration/new-food/{categoryId}")]
        public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId)
        {
            return this.nutritionService.GetFoodTypesByCategory(categoryId);
        }
    }
}
