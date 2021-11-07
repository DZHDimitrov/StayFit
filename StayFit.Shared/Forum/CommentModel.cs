namespace StayFit.Shared.Forum
{
    public class CommentModel
    {
        public string Id { get; set; }

        public string Author { get; set; }

        public string CreatedOn { get; set; }

        public string ModifiedOn { get; set; }

        public int Likes { get; set; }

        public int Dislikes { get; set; }

        // public int CommentNumber { get; set; }

        public string Content { get; set; }
    }
}
