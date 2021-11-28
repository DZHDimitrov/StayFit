using StayFit.Shared.Forum;
using StayFit.Shared.Forum.PostModels;
using StayFit.Shared.Forum.Responses;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IPostService
    {
        public Task<LoadPostCategoriesResponse> LoadPostCategories();

        public Task<LoadPostPreviewsResponse> LoadPostPreviewsByCategory(int categoryId,int? page =1);

        public Task<LoadPostResponse> LoadPostById(int postId);

        public Task<LoadPostPreviewsResponse> LoadUserPosts(string userId);

        public Task<LoadPostPreviewsResponse> LoadActivePosts(int? postCount);

        public Task<LoadPostPreviewsResponse> LoadRecentPosts();

        public Task<AddPostResponse> CreatePost(AddPostRequest model,string userId);

        public Task<EditPostResponse> EditPost(EditPostRequest model, string userId);

        public Task<DeletePostResponse> RemovePost(int id,string userId);
    }
}
