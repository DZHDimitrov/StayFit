using System;

namespace StayFit.Shared.Forum.PostModels
{
    public class AddCommentRequest
    {
        public int PostId { get; set; }

        public string Content { get; set; }

        public string CreatedOn { get; set; }
    }
}
