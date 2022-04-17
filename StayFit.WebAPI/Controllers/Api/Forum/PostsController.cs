//namespace StayFit.WebAPI.Controllers.Api.Forum
//{
//    using Microsoft.AspNetCore.Authorization;
//    using Microsoft.AspNetCore.Mvc;

//    using StayFit.Infrastructure.Extensions;

//    using StayFit.Services.StayFit.Services.Data.Interfaces;

//    using StayFit.Shared;
//    using StayFit.Shared.Forum.DeleteModels;
//    using StayFit.Shared.Forum.PostModels;
//    using StayFit.Shared.Forum.Responses;

//    using System.Threading.Tasks;

//    [Route("api/forums/[controller]")]
//    [AllowAnonymous]
//    [ApiController]
//    public class PostsController : BaseController
//    {
//        private readonly IPostService postService;

//        public PostsController(IPostService postService)
//        {
//            this.postService = postService;
//        }

//        [HttpGet]
//        [AllowAnonymous]
//        [Route("/api/forums/categories")]
//        public async Task<ApiResponse<LoadPostCategoriesResponse>> LoadPostsCategories()
//        {
//            var response = await this.postService.LoadPostCategories();
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [AllowAnonymous]
//        [Route("/api/forums/viewforum/{subCategoryId}")]
//        public async Task<ApiResponse<LoadPostPreviewsResponse>> LoadPostsPreviewsByCategory(int subCategoryId,int? page = 1)
//        {
//            var response =  await this.postService.LoadPostPreviewsByCategory(subCategoryId,page);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [AllowAnonymous]
//        [Route("{postId}")]
//        public async Task<ApiResponse<LoadPostResponse>> LoadPostById(int postId)
//        {
//            var response = await this.postService.LoadPostById(postId);
//            return response.ToApiResponse();
//        }

//        [AllowAnonymous]
//        [HttpPost]
//        public async Task<ApiResponse<AddPostResponse>> CreateNewPost(AddPostRequest model)
//        {
//            var userId = this.User.GetId();
//            var response = await this.postService.CreatePost(model, userId);
//            return response.ToApiResponse();
//        }

//        [HttpPut]
//        public async Task<ApiResponse<EditPostResponse>> EditPostById(EditPostRequest model)
//        {
//            var userId = this.User.GetId();
//            var response = await this.postService.EditPost(model, userId);
//            return response.ToApiResponse();
//        }

//        [HttpDelete]
//        [Route("{postId}")]
//        public async Task<ApiResponse<DeletePostResponse>> RemovePost(int postId)
//        {
//            var userId = this.User.GetId();
//            var response = await this.postService.RemovePost(postId, userId);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("active")]
//        public async Task<ApiResponse<LoadPostPreviewsResponse>> LoadActivePosts()
//        {
//            var response = await this.postService.LoadActivePosts(2);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("recent")]
//        public async Task<ApiResponse<LoadPostPreviewsResponse>> LoadRecentPosts()
//        {
//            var response =  await this.postService.LoadRecentPosts();
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("my_posts")]
//        public async Task<ApiResponse<LoadPostPreviewsResponse>> LoadUserPost()
//        {
//            var userId = this.User.GetId();
//            var response =  await this.postService.LoadUserPosts(userId);
//            return response.ToApiResponse();
//        }
//    }
//}
