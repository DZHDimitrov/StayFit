namespace StayFit.Infrastructure.Extensions
{

    using StayFit.Shared;

    public static class ApiResponseExtensions
    {
        public static ApiResponse<T> ToApiResponse<T>(this T data)
        {
            return new ApiResponse<T>(data);
        }
    }
}
