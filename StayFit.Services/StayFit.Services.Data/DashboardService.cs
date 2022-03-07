using Microsoft.EntityFrameworkCore;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.DiaryModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class DashboardService : IDashboardService
    {
        private readonly IRepository<Diary> diaryRepo;

        public DashboardService(IRepository<Diary> diaryRepo)
        {
            this.diaryRepo = diaryRepo;
        }

        public async Task<IEnumerable<TaskModel>> LoadDashboardTasks(string userId)
        {
            var id = 1;

            var tasks = new List<TaskModel>();

            var diary = await diaryRepo
                .All()
                .Include(d => d.Notes
                               .Where(n=>n.CreatedOn.Year == DateTime.Now.Year)
                               .Where(n=> n.CreatedOn.Month == DateTime.Now.Month)
                               .Where(n => n.CreatedOn.Day == DateTime.Now.Day))
                .Where(d => d.ApplicationUserId == userId).FirstOrDefaultAsync();

            if (diary == null)
            {
                var task = new TaskModel
                {
                    Id = id,
                    Name = "Дневник",
                    Description = "Време е за твоите записки",
                };

                tasks.Add(task);
                id++;
            }

            if (diary != null && diary.Notes.Count == 0)
            {
                var task = new TaskModel
                {
                    Id = id,
                    Name = "Напомняне",
                    Description = "Обнови дневника си за днес"
                };

                tasks.Add(task);
                id++;
            }

            return tasks;
        }
    }
}
