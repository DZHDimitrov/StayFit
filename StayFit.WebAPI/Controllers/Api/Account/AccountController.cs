namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Data.Models;
    using StayFit.Infrastructure.Extensions;
    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared;
    using StayFit.Shared.Account;

    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IAccountService accountService;

        public AccountController(UserManager<ApplicationUser> userManager,IAccountService accountService)
        {
            this.userManager = userManager;
            this.accountService = accountService;
        }

        [HttpGet]
        public IActionResult LoadUserInfoById(string userId)
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult EditUserInfoById()
        {
            return Ok();
        }

        [HttpGet]
        [Route("check")]
        public async Task<ApiResponse<bool>> Check([FromQuery] string type)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var response = await this.accountService.Check(userId,type);

            return response.ToApiResponse();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResponse<UserRegisterResponse>> Register(UserRegisterRequest model)
        {
            if (model == null || !this.ModelState.IsValid)
            {
                return new ApiResponse<UserRegisterResponse>(new ApiError("Model", "Empty or null model."));
            }

            var user = new ApplicationUser { Email = model.Email, UserName = model.Username,Gender = model.Gender };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return this.GetIdentityApiErrors<UserRegisterResponse>(result);
            }

            return new UserRegisterResponse { Id = user.Id }.ToApiResponse();
        }

        private ApiResponse<T> GetIdentityApiErrors<T>(IdentityResult identityResult)
        {
            return new ApiResponse<T>(identityResult.Errors.Select(x => new ApiError(x.Code, x.Description)).ToList());
        }
    }
}
