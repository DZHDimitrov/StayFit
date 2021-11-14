namespace StayFit.Shared.Forum.Responses
{

    using System.Collections.Generic;

    public class LoadCommentPreviewResponse
    {
        public IEnumerable<CommentPreviewModel> CommentPreviews { get; set; }
    }
}
