namespace StayFit.Shared.Forum
{
    using System.Collections.Generic;

    public class PostModel
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public string Content { get; set; }

        public string CreatedOn { get; set; }

        public string ModifiedOn { get; set; }

        public IEnumerable<CommentModel> Comments { get; set; }
    }
}
