using StayFit.Data.Models;
using StayFit.Services.DataTransferObjects;
using StayFit.Shared.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IUserService
    {
        Task<UserLoginResponseModel> Login(UserLoginRequestModel model);
        Task<string> Register(UserRegisterRequestModel model);
        IEnumerable<ApplicationUser> GetAll();
        UserDtoModel GetById(string id);
        //void Register(RegisterRequest model);
        //void Update(int id, UpdateRequest model);
        //void Delete(int id);
    }
}
