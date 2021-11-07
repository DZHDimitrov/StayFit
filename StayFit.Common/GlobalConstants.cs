using System.Net;

namespace StayFit.Common
{
    public static class GlobalConstants
    {
        public const int BAD_REQUEST = (int)HttpStatusCode.BadRequest;
        public const int INTERNAL_SERVER_ERROR = (int)HttpStatusCode.InternalServerError;

        public const string SAME_VOTE_TYPE_ERROR_MSG = "You already {0} this comment!";
        public const string ITERNAL_SERVER_ERROR_MSG = "Iternal server error.";
        public const string SELF_COMMENT_VOTE_ERROR_MSG = "You cannot vote for your own comment!";
        public const string NONEXISTANT_VOTE_ERROR_MSG = "This user hasn't voted yet!";
    }
}
