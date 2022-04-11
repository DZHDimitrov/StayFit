namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Infrastructure.Extensions;
    using StayFit.Services.StayFit.Services.Data.Interfaces;
    using StayFit.Shared;
    using StayFit.Shared.Account;

    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResponse<UserRegisterResponseModel>> Register(UserRegisterRequestModel model)
        {
            if (model == null || !this.ModelState.IsValid)
            {
                return this.ModelStateErrors<UserRegisterResponseModel>();
            }

            var (userId, result) = await accountService.Register(model);

            if (!result.Succeeded)
            {
                return this.GetIdentityApiErrors<UserRegisterResponseModel>(result);
            }

            return new UserRegisterResponseModel {Id = userId }.ToApiResponse();
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

        private ApiResponse<T> GetIdentityApiErrors<T>(IdentityResult identityResult)
        {
            return new ApiResponse<T>(identityResult.Errors.Select(x => new ApiError(x.Code, x.Description)).ToList());
        }
    }
}
