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
        private readonly RoleManager<ApplicationRole> roleManager;

        public UserService(
            AppDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<UserLoginResponseModel> Login(UserLoginRequestModel model)
        {
            var user = this._context.Users.FirstOrDefault(x=> x.UserName == model.Username);
            ;
            if (!await this.userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new ArgumentException("Password is not correct");
            }
            var userRole = this._context.Roles.FirstOrDefault(role => role.Id == this._context.UserRoles.FirstOrDefault(x => x.UserId == user.Id).RoleId);
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
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new ApplicationRole("Admin"));
            }
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new ApplicationRole("User"));
            }
            if (await roleManager.RoleExistsAsync("Admin"))
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
            var resultUser = await this.userManager.FindByNameAsync(register.Username);
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
