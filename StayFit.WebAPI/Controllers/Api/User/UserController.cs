using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StayFit.Common;
using StayFit.Data.Models;
using StayFit.Infrastructure.Extensions;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Requests.User;
using StayFit.Shared.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.User
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly IUserService userService;

        public UserController(
            RoleManager<ApplicationRole> _roleManager,
            IUserService _userService)
        {
            roleManager = _roleManager;
            userService = _userService;
        }

        [HttpGet]
        [Route("roles")]
        public async Task<ApiResponse<IEnumerable<RolesModel>>> GetRoles()
        {
            var response = await userService.GetRoles();

            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("roles/{roleId}")]
        public async Task<ApiResponse<IEnumerable<UserInRoleModel>>> GetUsersInRole(string roleId)
        {
            var response = await userService.GetUsersInRole(roleId);

            return response.ToApiResponse();
        }

        [HttpPost]
        [Route("roles/{roleId}")]
        public async Task<ApiResponse<string>> ModifyRole(string roleId,AddToRoleRequest request)
        {
            var response = await userService.ModifyRole(roleId,request);

            return response.ToApiResponse();
        }

        [HttpDelete]
        [Route("roles/{roleId}")]
        public async Task<ApiResponse<string>> RemoveRole(string roleId)
        {
            var response = await userService.RemoveRole(roleId);

            return response.ToApiResponse();
        }

        public async Task<IActionResult> CreateRole()
        {
            await roleManager.CreateAsync(new ApplicationRole()
            {
                Name = UserConstants.Roles.Moderator,
            });

            return Ok();
        }
    }
}
