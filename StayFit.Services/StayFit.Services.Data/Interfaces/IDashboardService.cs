using StayFit.Shared.Dashboard;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IDashboardService
    {
        public Task<IEnumerable<TaskModel>> LoadDashboardTasks(string userId);
    }
}
