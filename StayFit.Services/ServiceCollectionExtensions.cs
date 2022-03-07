using AutoMapper;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Repositories;
using StayFit.Infrastructure;
using StayFit.Services.StayFit.Services.Data;
using StayFit.Services.StayFit.Services.Data.Interfaces;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureAppServices(this IServiceCollection @this)
        {
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

        public static void ConfigureCors(this IServiceCollection @this)
        {
            @this
                .AddCors(options =>
                {
                    options.AddPolicy("_myAllowSpecificOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
                });
        }
    }
}
