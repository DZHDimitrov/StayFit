using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Progress;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Progress
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProgressController : BaseController
    {
        private readonly IProgressService progressService;

        public ProgressController(IProgressService progressService)
        {
            this.progressService = progressService;
        }

        [HttpGet]
        public async Task<ApiResponse<IEnumerable<MeasurementModel>>> LoadMeasurements()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await progressService.LoadMeasurements(userId);

            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<int>> CreateMeasurement(CreateMeasurementModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await progressService.CreateMeasurement(userId,model);

            return response.ToApiResponse();
        }

        [Route("{measurementId}")]
        [HttpGet]
        public async Task<ApiResponse<MeasurementModel>> LoadMeasurementById(string measurementId)
        {
            var response = await progressService.LoadMeasurementById(measurementId);

            return response.ToApiResponse();
        }

        [Route("{measurementId}")]
        [HttpPut]
        public async Task<ApiResponse<string>> EditMeasurementById(string measurementId,EditMeasurementModel model)
        {
            var response = await progressService.EditMeasurement(measurementId,model);

            return response.ToApiResponse();
        }

        [Route("{measurementId}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMeasurement(string measurementId)
        {
            await progressService.DeleteMeasurement(measurementId);

            return Ok();
        }
    }
}
