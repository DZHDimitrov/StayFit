namespace StayFit.Common
{
    public static class GlobalConstants
    {
        //ERRORS
        public const string NOT_LOGGED_IN_ERROR_MSG = "You are not logged in!";
        public const string SAME_VOTE_TYPE_ERROR_MSG = "You already {0} this comment!";
        public const string ITERNAL_SERVER_ERROR_MSG = "Iternal server error.";
        public const string SELF_COMMENT_VOTE_ERROR_MSG = "You cannot vote for your own comment!";
        public const string NONEXISTANT_VOTE_ERROR_MSG = "This user hasn't voted yet!";
        public const string POST_NOT_FOUND = "No such post was found";
        public const string UNABLE_TO_EDIT = "You cannot edit this {0}";

        //OK
        public const string EDIT_POST_SUCCESS = "You successfully edited your post.";
        public const string VOTE_ADD_SUCCESS = "You successfully voted for this comment.";
        public const string VOTE_REMOVE_SUCCESS = "Your vote has been removed.";
    }
}
