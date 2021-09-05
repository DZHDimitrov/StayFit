using StayFit.Data;
using StayFit.Data.Models;
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

        public UserService(
            AppDbContext context)
        {
            _context = context;
        }

        public ApplicationUser Authenticate(UserLoginRequestModel model)
        {
            var user = this._context.Users.FirstOrDefault(x=> x.UserName == model.Username);
            return user;
        }

        public IEnumerable<ApplicationUser> GetAll()
        {
            throw new NotImplementedException();
        }

        public ApplicationUser GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
