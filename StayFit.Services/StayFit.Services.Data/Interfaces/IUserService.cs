using StayFit.Data.Models;
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
        ApplicationUser Authenticate(UserLoginRequestModel model);
        IEnumerable<ApplicationUser> GetAll();
        ApplicationUser GetById(int id);
        //void Register(RegisterRequest model);
        //void Update(int id, UpdateRequest model);
        //void Delete(int id);
    }
}
