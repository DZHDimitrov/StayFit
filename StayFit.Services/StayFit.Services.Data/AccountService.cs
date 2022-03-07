using Microsoft.EntityFrameworkCore;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.DiaryModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<Diary> diaryRepo;

        public AccountService(IRepository<Diary> diaryRepo)
        {
            this.diaryRepo = diaryRepo;
        }

        public async Task<bool> Check(string userId,string type)
        {
            UserCheckType userCheckType;

            var isValidType = Enum.TryParse(type, true, out userCheckType);

            if(isValidType)
            {
                if (userCheckType == UserCheckType.diary)
                {
                    var diary = await diaryRepo
                        .All()
                        .Where(d => d.ApplicationUserId == userId)
                        .FirstOrDefaultAsync();

                    return diary != null ? true : false;
                }
            }

            return false;
        }
    }
}
