
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Dashboard;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DashboardController : BaseController
    {
        private readonly IDashboardService dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        public async Task<ApiResponse<IEnumerable<TaskModel>>> LoadTasks()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await this.dashboardService.LoadDashboardTasks(userId);

            return response.ToApiResponse();
        }
    }
}
