using StayFit.Shared.Forum;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IPostService
    {
        public IEnumerable<PostMainCategoryModel> LoadPostCategories();

        public IEnumerable<PostPreviewModel> LoadPostPreviewsByCategory(int categoryId);

        public Task<PostModel> LoadPostById(int postId);

        public Task CommentVote(string userId, string commentId,bool? isLike);

        public Task RemoveVote(string userId, string commentId);
    }
}
