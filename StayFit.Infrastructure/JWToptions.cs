namespace StayFit.Infrastructure
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    public static class JWToptions
    {
        public static void GenerateJWTOptions(IServiceCollection services,byte[] key)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };
                x.Events = new JwtBearerEvents
                {
                    OnChallenge = async (context) =>
                    {
                        context.HandleResponse();
                        if (context.AuthenticateFailure != null)
                        {
                            context.Response.StatusCode = 403;
                            await context.HttpContext.Response.WriteAsJsonAsync(new
                            {
                                Message = "You are not authorized to access this resource!",
                                StatusCode = 403
                            });
                        }
                    }
                };
            });
        }
    }
}
