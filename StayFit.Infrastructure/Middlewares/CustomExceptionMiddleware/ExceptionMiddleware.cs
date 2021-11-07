namespace StayFit.Infrastructure.Middlewares.CustomExceptionMiddleware
{
    using StayFit.Common;
    using StayFit.Shared;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;

    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly Dictionary<string, int> StatusMessages = new Dictionary<string, int>()
        {
            [string.Format(GlobalConstants.SAME_VOTE_TYPE_ERROR_MSG, "liked")] = StatusNums.BAD_REQUEST,
            [string.Format(GlobalConstants.SAME_VOTE_TYPE_ERROR_MSG, "disliked")] = StatusNums.BAD_REQUEST,
            [GlobalConstants.SELF_COMMENT_VOTE_ERROR_MSG] = StatusNums.BAD_REQUEST,
            [GlobalConstants.ITERNAL_SERVER_ERROR_MSG] = StatusNums.INTERNAL_SERVER_ERROR,
            [GlobalConstants.NONEXISTANT_VOTE_ERROR_MSG] = StatusNums.BAD_REQUEST,
            [GlobalConstants.NOT_LOGGED_IN_ERROR_MSG] = StatusNums.Unauthorized,
            [string.Format(GlobalConstants.UNABLE_TO_EDIT,"post")] = StatusNums.Forbidden
        };

        public ExceptionMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await this._next(httpContext);
            }
            catch (System.Exception e)
            {
                await HandleExceptionAsync(httpContext,e.Message);
            }
        }

        private Task HandleExceptionAsync(HttpContext httpContext,string message)
        {
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = StatusMessages.ContainsKey(message) ? StatusMessages[message] : 500;
            return httpContext.Response.WriteAsync(new ErrorModel
            {
                StatusCode = httpContext.Response.StatusCode,
                Message = message
            }.ToString());
        }
    }
}
