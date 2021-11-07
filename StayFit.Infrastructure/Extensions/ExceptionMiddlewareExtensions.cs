using Microsoft.AspNetCore.Builder;
using StayFit.Infrastructure.Middlewares.CustomExceptionMiddleware;

namespace StayFit.Infrastructure.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
