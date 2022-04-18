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

        public static void AddAppServices(this IServiceCollection @this)
        {
            //@this.AddTransient<IPostService, PostService>();

            //@this.AddTransient<ICommentService, CommentService>();

            @this.AddTransient<IFoodService, FoodService>();

            //@this.AddTransient<IConversationService, ConversationService>();

            @this.AddTransient<IFormatService, FormatService>();

            @this.AddTransient<IDiaryService, DiaryService>();

            @this.AddTransient<IDashboardService, DashboardService>();

            @this.AddTransient<IAccountService, AccountService>();

            @this.AddTransient<IReadingService, ReadingService>();

            @this.AddTransient<IProgressService, ProgressService>();

            @this.AddTransient<IBodyService, BodyService>();

            @this.AddTransient<IUserService, UserService>();
        }

        public static void ConfigureCloudinary(this IServiceCollection @this, IConfiguration configuration)
        {
            var cloudinaryAccount = new CloudinaryDotNet.Account(
            configuration["Authentication:Cloudinary:CloudName"],
            configuration["Authentication:Cloudinary:ApiKey"],
            configuration["Authentication:Cloudinary:ApiSecret"]);

            var cloudinary = new Cloudinary(cloudinaryAccount);

            @this.AddSingleton(cloudinary);
        }

        public static void ConfigureAutoMapper(this IServiceCollection @this)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            @this.AddSingleton(mapper);
        }

        public static void ConfigureCORS(this IServiceCollection @this)
        {
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
        }

        public static void ConfigureToken(this IServiceCollection @this,IConfiguration configuration)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtTokenValidation:Secret"]));

            @this
                .Configure<TokenProviderOptions>(opts =>
                {
                    opts.Audience = configuration["JwtTokenValidation:Audience"];
                    opts.Issuer = configuration["JwtTokenValidation:Issuer"];
                    opts.Path = "/api/account/login";
                    opts.Expiration = TimeSpan.FromDays(2);
                    opts.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
                })
                .AddAuthentication()
                .AddJwtBearer(opts =>
                {
                    opts.RequireHttpsMetadata = false;
                    opts.SaveToken = true;
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
        }

        public static void ConfigureIdentity(this IServiceCollection @this)
        {
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
        }

        public static void ConfigureControllers(this IServiceCollection @this)
        {
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
        }

        public static void ConfigureDatabase(this IServiceCollection @this)
        {
            @this
                 .AddDbContext<AppDbContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));

            @this.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            @this.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
        }

        public static void ConfigureSwagger(this IServiceCollection @this)
        {
            @this
                .AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "StayFitAPI", Version = "v1" });
                });
        }
    }
}
