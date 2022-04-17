using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;
using StayFit.Common;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models;
using StayFit.Infrastructure;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared.Requests.User;
using StayFit.Shared.User;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly IRepository<ApplicationUser> userRepo;

        public UserService(
            UserManager<ApplicationUser> _userManager,
            RoleManager<ApplicationRole> _roleManager,
            IRepository<ApplicationUser> _userRepo)
        {
            userManager = _userManager;
            roleManager = _roleManager;
            userRepo = _userRepo;
        }

        public async Task<string> ModifyRole(string roleId, AddToRoleRequest request)
        {
            var user = await userManager.FindByIdAsync(request.UserId);
            var role = await roleManager.FindByIdAsync(roleId);

            Guards.AgainstNull(role, "Ролята");

            if (request.ToAdd)
            {
                if (await userManager.IsInRoleAsync(user, role.Name))
                {
                    throw new ArgumentException(UserConstants.Errors.UserAlreadyAddedInRole);
                }

                var addResult = await userManager.AddToRoleAsync(user, role.Name);

                if (addResult.Succeeded)
                {
                    return role.Id;
                }

                return null;
            }

            if (!await userManager.IsInRoleAsync(user, role.Name))
            {
                throw new ArgumentException(UserConstants.Errors.UserNotInRole);
            }

            var removeResult = await userManager.RemoveFromRoleAsync(user, role.Name);

            if (removeResult.Succeeded)
            {
                return role.Id;
            }
            return null;
        }

        public async Task<IEnumerable<RolesModel>> GetRoles()
        {
            var allRoles = roleManager.Roles.ToList();

            var roles = allRoles
                .Select(x =>
                new RolesModel
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .OrderBy(x => x.Name)
                .ToList();

            foreach (var role in roles)
            {
                role.UsersInRole = (await userManager.GetUsersInRoleAsync(role.Name)).Count;
            }

            return roles;
        }

        public async Task<IEnumerable<UserInRoleModel>> GetUsersInRole(string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);

            var users = await userRepo
                .All()
                .Select(u => new UserInRoleModel
                {
                    Id = u.Id,
                    Username = u.UserName
                })
                .ToListAsync();

            foreach (var user in users)
            {
                var currentUser = await userManager.FindByIdAsync(user.Id);
                var isInRole = await userManager.IsInRoleAsync(currentUser, role.Name);
                user.IsInRole = isInRole;
            }

            return users
                .OrderByDescending(u => u.IsInRole)
                .ThenBy(u => u.Username)
                .ToList();
        }

        public async Task<string> RemoveRole(string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);

            Guards.AgainstNull(role,"Ролята");

            var result = await roleManager.DeleteAsync(role);

            if (result.Succeeded)
            {
                return role.Id;
            }

            return null;
        }
    }
}
