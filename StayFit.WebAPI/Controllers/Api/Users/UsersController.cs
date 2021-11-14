﻿namespace StayFit.WebAPI.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using StayFit.Data.Models;
    using StayFit.Infrastructure.Extensions;
    using StayFit.Shared;
    using StayFit.Shared.Account;

    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
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
