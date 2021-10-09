using Microsoft.AspNetCore.Identity;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Services.DataTransferObjects;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class UserService : IUserService
    {
        private AppDbContext _context;
        private readonly UserManager<ApplicationUser> userManager;

        public UserService(
            AppDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        public async Task<UserLoginResponseModel> Login(UserLoginRequestModel model)
        {
            var user = this._context.Users.FirstOrDefault(x=> x.UserName == model.Username);
            ;
            if (!await this.userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new ArgumentException("Password is not correct");
            }
            var response = new UserLoginResponseModel
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Gender = user.Gender,
            };
            return response;
        }

        public async Task<string> Register(UserRegisterRequestModel register)
        {
            var user = new ApplicationUser 
            {
                UserName = register.Username,
                Email = register.Email, 
                Gender = register.Gender,
                CreatedOn = DateTime.UtcNow,
                IsDeleted = false,
            };
            var userCreation = await this.userManager.CreateAsync(user, register.Password);
            if (!userCreation.Succeeded)
            {
                return null;
            }
            var resultUser = await this.userManager.FindByEmailAsync(register.Email);
            return resultUser.Id;
        }

        public IEnumerable<ApplicationUser> GetAll()
        {
            throw new NotImplementedException();
        }

        public UserDtoModel GetById(string id)
        {
            var user = this._context.Users.FirstOrDefault(x => x.UserName == id);
            var dto = new UserDtoModel
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Gender = user.Gender,
            };
            return dto;
        }
    }
}
