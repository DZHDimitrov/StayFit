using Microsoft.AspNetCore.Identity;

using StayFit.Data.Models;

using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared.Account;

using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> userManager;

        public AccountService(UserManager<ApplicationUser> userManager)
        {
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
