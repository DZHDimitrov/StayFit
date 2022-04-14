using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models;
using StayFit.Data.Models.DiaryModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Account;
using StayFit.Shared.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<Diary> diaryRepo;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IRepository<ApplicationUser> userRepo;

        public AccountService(IRepository<Diary> diaryRepo,UserManager<ApplicationUser> userManager, IRepository<ApplicationUser> _userRepo)
        {
            this.diaryRepo = diaryRepo;
            this.userManager = userManager;
        }

        public async Task<(string,IdentityResult)> Register(UserRegisterRequestModel model)
        {
            var user = new ApplicationUser 
            { 
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.Username,
                Gender = model.Gender
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            return (user.Id, result);
        }
    }
}
