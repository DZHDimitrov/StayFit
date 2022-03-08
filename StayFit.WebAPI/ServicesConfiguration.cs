using AutoMapper;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using StayFit.Data;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models;
using StayFit.Data.Repositories;
using StayFit.Infrastructure;
using StayFit.Infrastructure.Middlewares.Authorization;
using StayFit.Services.StayFit.Services.Data;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using System;
using System.Text;

namespace StayFit.WebAPI
{
    public static class ServicesConfiguration
    {
        private static readonly string allowSpecificOrigins = "_myAllowSpecificOrigins";

        public static void ConfigureServices(this IServiceCollection @this,IConfiguration configuration)
        {
            //AppServices
            @this.AddTransient<IPostService, PostService>();

            @this.AddTransient<ICommentService, CommentService>();

            @this.AddTransient<IFoodService, FoodService>();

            @this.AddTransient<IConversationService, ConversationService>();

            @this.AddTransient<IDiaryService, DiaryService>();

            @this.AddTransient<IDashboardService, DashboardService>();

            @this.AddTransient<IAccountService, AccountService>();

            @this.AddTransient<IReadingService, ReadingService>();

            //Data repositories
            @this.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));

            @this.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            //Cloudinary
            var cloudinaryAccount = new CloudinaryDotNet.Account(
                configuration["Authentication:Cloudinary:CloudName"],
                configuration["Authentication:Cloudinary:ApiKey"],
                configuration["Authentication:Cloudinary:ApiSecret"]);

            var cloudinary = new Cloudinary(cloudinaryAccount);

            @this.AddSingleton(cloudinary);

            //AutoMapper
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            @this.AddSingleton(mapper);

            //CORS
            @this
                .AddCors(options =>
                {
                    options.AddPolicy(allowSpecificOrigins,
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
                });

            //Add authentication and token config
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtTokenValidation:Secret"]));

            @this
                .Configure<TokenProviderOptions>(opts =>
                {
                    opts.Audience = configuration["JwtTokenValidation:Audience"];
                    opts.Issuer = configuration["JwtTokenValidation:Issuer"];
                    opts.Path = "/api/account/login";
                    opts.Expiration = TimeSpan.FromDays(1);
                    opts.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
                })
                .AddAuthentication()
                .AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = configuration["JwtTokenValidation:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = configuration["JwtTokenValidation:Audience"],
                        ValidateLifetime = true
                    };
                }); ;

            //Identity config

            @this
                .AddDefaultIdentity<ApplicationUser>(x =>
                {
                    x.Password.RequireDigit = false;
                    x.Password.RequireLowercase = false;
                    x.Password.RequireUppercase = false;
                    x.Password.RequireNonAlphanumeric = false;
                    x.Password.RequiredLength = 5;
                })
                .AddRoles<ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>();

            //Add controllers with JSON serializer config
            @this
                 .AddControllers()
                 .AddNewtonsoftJson(options =>
                 {
                     options.SerializerSettings.ContractResolver = new DefaultContractResolver()
                     {
                         NamingStrategy = new CamelCaseNamingStrategy(),
                     };
                     options.SerializerSettings.DateFormatString = "yyyy-MM-dd";

                 });

            //Database config
            @this
                 .AddDbContext<AppDbContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));

            //Swagger config
            @this
                .AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "StayFitAPI", Version = "v1" });
                });
        }
    }
}
