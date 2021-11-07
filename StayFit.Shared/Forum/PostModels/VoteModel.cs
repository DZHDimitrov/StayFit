namespace StayFit.Shared.Forum.PostModels
{
    public class VoteModel
    {
        public string UserId { get; set; }

        public string CommentId { get; set; }

        public bool? IsLike { get; set; }
    }
}
