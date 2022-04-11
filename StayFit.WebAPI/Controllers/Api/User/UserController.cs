using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StayFit.Common;
using StayFit.Data.Models;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.User
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly RoleManager<ApplicationRole> roleManager;

        public UserController(RoleManager<ApplicationRole> _roleManager)
        {
            roleManager = _roleManager;
        }

        public async Task<IActionResult> CreateRole()
        {
            await roleManager.CreateAsync(new ApplicationRole()
            {
                Name = UserConstants.Roles.Administrator,
            });

            return Ok();
        }
    }
}
