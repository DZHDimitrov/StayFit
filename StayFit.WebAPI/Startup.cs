using AutoMapper;

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
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using StayFit.Data;
using StayFit.Data.Models;

using StayFit.Infrastructure;
using StayFit.Infrastructure.Extensions;
using StayFit.Infrastructure.Middlewares.Authorization;

using StayFit.Services.StayFit.Services.Data;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared;

using StayFit.WebAPI.CurrentModels;

using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
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

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(allowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                });
            });

            var jwtSection = this.configuration.GetSection("JWTSettings");
            services.Configure<JWTSettings>(jwtSection);
            var appSettings = jwtSection.Get<JWTSettings>();
            var key = Encoding.UTF8.GetBytes(appSettings.SecretKey);

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.SecretKey));

            services.Configure<TokenProviderOptions>(opts =>
            {
                opts.Audience = this.configuration["JwtTokenValidation:Audience"];
                opts.Issuer = this.configuration["JwtTokenValidation:Issuer"];
                opts.Path = "/api/users/login";
                opts.Expiration = TimeSpan.FromDays(15);
                opts.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            services
                .AddAuthentication()
                .AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = this.configuration["JwtTokenValidation:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = this.configuration["JwtTokenValidation:Audience"],
                        ValidateLifetime = true
                    };
                });

            services.AddDefaultIdentity<ApplicationUser>(x =>
            {
                x.Password.RequireDigit = false;
                x.Password.RequireLowercase = false;
                x.Password.RequireUppercase = false;
                x.Password.RequireNonAlphanumeric = false;
                x.Password.RequiredLength = 5;
            })
                .AddRoles<ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>();
            services.AddDbContext<AppDbContext>(
       options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));


            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver()
                    {
                        NamingStrategy = new CamelCaseNamingStrategy(),
                    };
                    options.SerializerSettings.DateFormatString = "yyyy-MM-dd";

                });
            services.AddSwaggerGen(c => 
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "StayFitAPI", Version = "v1" });
            });

            

            //JWToptions.GenerateJWTOptions(services, key);


            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddMvc();

            services.AddTransient<IReadingService, ReadingService>();
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<IFoodService, FoodService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
            app.UseHttpsRedirection();
            app.UseRouting();

            //app.UseAuthentication();
            app.UseAuthorization();

            app.UseJwtBearerTokens(app.ApplicationServices.GetRequiredService<IOptions<TokenProviderOptions>>(),PrincipalResolver);

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
