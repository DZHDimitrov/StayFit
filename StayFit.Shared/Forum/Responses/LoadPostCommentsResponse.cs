namespace StayFit.Shared.Forum.Responses
{

    using System.Collections.Generic;

    public class LoadPostCommentsResponse
    {
        public IEnumerable<CommentModel> Comments { get; set; }
    }
}
