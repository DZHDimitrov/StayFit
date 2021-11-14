namespace StayFit.Shared.Forum
{

    using System;

    public class CommentPreviewModel
    {
        public int PostId { get; set; }

        public string Id { get; set; }

        public string Author { get; set; }

        //public string AuthorImageURL { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Content { get; set; }
    }
}
