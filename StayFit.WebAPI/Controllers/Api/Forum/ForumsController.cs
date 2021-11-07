using Microsoft.AspNetCore.Mvc;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Forum;
using StayFit.Shared.Forum.PostModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Forum
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumsController : ControllerBase
    {
        private readonly IPostService postService;

        public ForumsController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpGet]
        public IEnumerable<PostMainCategoryModel> LoadForumCategories()
        {
            return this.postService.LoadPostCategories();
        }

        [HttpPost]
        [Route("likes")]
        public async Task<IActionResult> Vote(VoteModel model)
        {
            if (model.IsLike != null)
            {
                await this.postService.CommentVote(model.UserId, model.CommentId, model.IsLike);
                return Ok("You successfully voted for this comment.");
            }
            else
            {
                await this.postService.RemoveVote(model.UserId, model.CommentId);
                return Ok("The vote has been removed.");
            }
        }

        [HttpGet]
        [Route("viewforum/{subCategoryId}")]
        public IEnumerable<PostPreviewModel> LoadPostsPreviewsByCategory(int subCategoryId)
        {
            return this.postService.LoadPostPreviewsByCategory(subCategoryId);
        }
        [HttpGet]
        [Route("viewthread/{postId}")]
        public async Task<PostModel> LoadPostById(int postId)
        {
            return await this.postService.LoadPostById(postId);
        }
    }
}
