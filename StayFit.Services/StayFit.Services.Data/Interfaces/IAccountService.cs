using Microsoft.AspNetCore.Identity;
using StayFit.Shared.Account;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IAccountService
    {
        public Task<(string, IdentityResult)> Register(UserRegisterRequestModel model);
    }
}
