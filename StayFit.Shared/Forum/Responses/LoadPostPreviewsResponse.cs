namespace StayFit.Shared.Forum.Responses
{

    using System.Collections.Generic;

    public class LoadPostPreviewsResponse : PaginatedResponse
    {
        public IEnumerable<PostPreviewModel> PostPreviews { get; set; }
    }
}
