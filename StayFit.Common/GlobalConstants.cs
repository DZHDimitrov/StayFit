namespace StayFit.Common
{
    public static class GlobalConstants
    {
        //SYSTEM ERRORS
        public const string ITERNAL_SERVER_ERROR_MSG = "Iternal server error.";
        public const string NOT_LOGGED_IN_ERROR_MSG = "You are not logged in!";

        //ERRORS
        public const string SELF_COMMENT_VOTE_ERROR_MSG = "You cannot vote for your own comment!";
        public const string ALREADY_VOTED_ERROR_MSG = "You already voted for this comment!";
        public const string ITEM_NOT_FOUND = "No such {0} was found";
        public const string UNABLE_TO_MODIFY = "You cannot {0} this {1}";

        //OK
        public const string EDIT_ITEM_SUCCESS = "You successfully edited your {0}.";
        public const string ITEM_ADD_SUCCESS = "You successfully added a {0}.";
        public const string ITEM_REMOVE_SUCCESS = "Your {0} has been removed.";
    }
}
