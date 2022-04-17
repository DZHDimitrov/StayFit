using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Seeding;
using StayFit.Infrastructure.Middlewares.Authorization;

using StayFit.Shared;

using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace StayFit.WebAPI
{
    public class Startup
    {
        readonly string allowSpecificOrigins = "_myAllowSpecificOrigins";

        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAppServices();

            services.ConfigureCloudinary(configuration);

            services.ConfigureAutoMapper();

            services.ConfigureCORS();    

            services.ConfigureToken(configuration);

            services.ConfigureIdentity();

            services.ConfigureControllers();

            services.ConfigureDatabase();

            services.ConfigureSwagger();

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
                dbContext.Database.Migrate();

                ApplicationDbContextSeeder.Seed(dbContext, serviceScope.ServiceProvider);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "StayFit v1"));
            };

            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseExceptionHandler(app =>
            {
                app.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.OK;
                        context.Response.ContentType = "application/json";

                        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();

                        if (exceptionHandlerFeature?.Error != null)
                        {
                            var ex = exceptionHandlerFeature.Error;
                            while (ex is AggregateException aggregateException
                                       && aggregateException.InnerExceptions.Any())
                            {
                                ex = aggregateException.InnerExceptions.First();
                            }
                            var exceptionMessage = ex.Message;
                            if (!env.IsDevelopment())
                            {
                                exceptionMessage = ex.ToString();
                            }
                            await context.Response
                                    .WriteAsync(JsonConvert.SerializeObject(new ApiResponse<object>(new ApiError("GLOBAL", exceptionMessage))))
                                    .ConfigureAwait(continueOnCapturedContext: false);
                        }
                    });
            });


            app.UseCors(allowSpecificOrigins);
            app.UseRouting();

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == (int)HttpStatusCode.Forbidden)
                {
                    await context.Response.WriteAsJsonAsync(new ApiError()
                    {
                        Error = "Нямате достъп или права за този ресурс"
                    });
                }
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseJwtBearerTokens(app.ApplicationServices.GetRequiredService<IOptions<TokenProviderOptions>>(), PrincipalResolver);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        private static async Task<GenericPrincipal> PrincipalResolver(HttpContext context)
        {
            var userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var username = context.Request.Form["username"];
            var user = await userManager.FindByNameAsync(username);

            if (user == null || user.IsDeleted) return null;

            var password = context.Request.Form["password"];

            var isValidPassword = await userManager.CheckPasswordAsync(user, password);

            if (!isValidPassword) return null;

            var roles = await userManager.GetRolesAsync(user);

            var identity = new GenericIdentity(username, "Token");
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));

            return new GenericPrincipal(identity, roles.ToArray());
        }
    }
}
