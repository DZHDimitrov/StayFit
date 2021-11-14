namespace StayFit.Shared.Forum
{

    using System;

    public class CommentModel
    {
        public string Id { get; set; }

        public string Author { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int Likes { get; set; }

        public int Dislikes { get; set; }

        // public int CommentNumber { get; set; }

        public string Content { get; set; }
    }
}
