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
            services.ConfigureServices(this.configuration);

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
                dbContext.Database.Migrate();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "StayFit v1"));
            };
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            //app.ConfigureCustomExceptionMiddleware();
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

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseJwtBearerTokens(app.ApplicationServices.GetRequiredService<IOptions<TokenProviderOptions>>(), PrincipalResolver);

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "MyArea",
                //    pattern: "{area:exists}/api/{controller}"
                //    );
                endpoints.MapControllers();
            });

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(name: "asd",template: "asd", defaults: new {controller = "asd",action = "" } )
            //});
        }
        private static async Task<GenericPrincipal> PrincipalResolver(HttpContext context)
        {
            var userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var username = context.Request.Form["username"];
            var user = await userManager.FindByNameAsync(username);
            if (user == null || user.IsDeleted)
            {
                return null;
            }

            var password = context.Request.Form["password"];

            var isValidPassword = await userManager.CheckPasswordAsync(user, password);
            if (!isValidPassword)
            {
                return null;
            }

            var roles = await userManager.GetRolesAsync(user);

            var identity = new GenericIdentity(username, "Token");
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));

            return new GenericPrincipal(identity, roles.ToArray());
        }
    }
}
