using StayFit.Shared.Forum.Responses;
using StayFit.Shared.Forum.PostModels;

using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface ICommentService
    {
        public Task<LoadCommentPreviewResponse> LoadNewComments();

        public Task<LoadCommentPreviewResponse> LoadUserComments(string userId);

        public Task<LoadCommentPreviewResponse> LoadChosenComments(string userId);

        public Task<AddCommentResponse> CreateComment(AddCommentRequest model, string userId);

        public Task<LoadPostCommentsResponse> LoadCommentsByPostId(int? postId);

        public Task EditComment(EditCommentRequest model, string userId);

        public Task<DeleteCommentResponse> DeleteComment(string commentId, string userId);

        public Task<AddVoteResponse> CommentVote(string userId, string commentId, bool? isLike);

        public Task<ModifyVoteResponse> EditVote(string userId, string commentId, bool? isLike);

        public Task<ModifyVoteResponse> RemoveVote(string userId, string commentId);
    }
}
