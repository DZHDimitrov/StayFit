

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.Account;
using StayFit.WebAPI.CurrentModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IUserService userService;
        private readonly JWTSettings _jwtSettings;

        public UsersController(AppDbContext context, IOptions<JWTSettings> jwtSettings,UserManager<ApplicationUser> userManager,IUserService userService)
        {
            this.context = context;
            this.userManager = userManager;
            this.userService = userService;
            this._jwtSettings = jwtSettings.Value;
        }

        [HttpPost]
        [Route("/api/users/login")]
        public async Task<ActionResult<UserLoginResponseModel>> Login([FromBody] UserLoginRequestModel login)
        {
            var user = this.userService.Authenticate(login);
            if (!await this.userManager.CheckPasswordAsync(user, login.Password))
            {
                return NotFound();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(this._jwtSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, user.Email) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var response = new UserLoginResponseModel();
            response.access_token = tokenHandler.WriteToken(token);
            return response;
        }

        [HttpPost]
        [Route("/api/users/register")]
        public async Task<ActionResult<UserRegisterResponseModel>> Register([FromBody] UserRegisterRequestModel register)
        {
            var user = new ApplicationUser { UserName = register.Username, Email = register.Email };
            var userCreation = await this.userManager.CreateAsync(user, register.Password);
            if (!userCreation.Succeeded)
            {
                return this.BadRequest(userCreation.Errors);
            }
            var resultUser = await this.userManager.FindByEmailAsync(register.Email);
            return new UserRegisterResponseModel { Id = resultUser.Id };
        }
        private ApiResponse<T> GetIdentityApiErrors<T>(IdentityResult identityResult)
        {
            return new ApiResponse<T>(identityResult.Errors.Select(x => new ApiError(x.Code, x.Description)).ToList());
        }
    }
}
