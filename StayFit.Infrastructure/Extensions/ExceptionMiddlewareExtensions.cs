namespace StayFit.Infrastructure.Extensions
{
    using Microsoft.AspNetCore.Builder;
    using StayFit.Infrastructure.Middlewares.CustomExceptionMiddleware;

    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
