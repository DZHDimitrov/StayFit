using Microsoft.AspNet.Identity;
using StayFit.Data.Models;
using StayFit.Shared.Requests.User;
using StayFit.Shared.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<RolesModel>> GetRoles();

        public Task<IEnumerable<UserInRoleModel>> GetUsersInRole(string roleId);

        public Task<string> ModifyRole(string roleId,AddToRoleRequest request);

        public Task<string> RemoveRole(string roleId);
    }
}
