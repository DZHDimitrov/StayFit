namespace StayFit.Common
{

    using System.Net;

    public static class StatusNums
    {
        public const int BAD_REQUEST = (int)HttpStatusCode.BadRequest;
        public const int INTERNAL_SERVER_ERROR = (int)HttpStatusCode.InternalServerError;
        public const int Unauthorized = (int)HttpStatusCode.Unauthorized;
        public const int Forbidden = (int)HttpStatusCode.Forbidden;
    }
}
