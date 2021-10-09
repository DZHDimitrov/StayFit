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
        private readonly IUserService userService;
        private readonly JWTSettings _jwtSettings;

        public UsersController(
            AppDbContext context,
            IOptions<JWTSettings> jwtSettings,
            IUserService userService)
        {
            this.userService = userService;
            this._jwtSettings = jwtSettings.Value;
        }

        [HttpPost]
        [Route("/api/users/login")]
        public async Task<ActionResult<UserLoginResponseModel>> Login([FromBody] UserLoginRequestModel login)
        {
            try
            {
                var user = await this.userService.Login(login);
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(this._jwtSettings.SecretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                        new Claim[] 
                        { 
                            new Claim(ClaimTypes.Name, user.Email),
                            new Claim(ClaimTypes.NameIdentifier,user.Id) }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.access_token = tokenHandler.WriteToken(token);
                return user;
            }
            catch (ArgumentException ae)
            {
                return this.StatusCode(401);
            }     
        }

        [HttpPost]
        [Route("/api/users/register")]
        public async Task<ActionResult<UserRegisterResponseModel>> Register([FromBody] UserRegisterRequestModel registerModel)
        {
            var createUserId = await this.userService.Register(registerModel);
            if (createUserId == null)
            {
                return this.BadRequest();
            }
            return new UserRegisterResponseModel { Id = createUserId };
        }
        private ApiResponse<T> GetIdentityApiErrors<T>(IdentityResult identityResult)
        {
            return new ApiResponse<T>(identityResult.Errors.Select(x => new ApiError(x.Code, x.Description)).ToList());
        }
    }
}
