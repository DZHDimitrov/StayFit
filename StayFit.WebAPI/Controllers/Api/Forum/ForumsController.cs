using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StayFit.Common;
using StayFit.Data.Models;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Forum;
using StayFit.Shared.Forum.PostModels;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StayFit.WebAPI.Controllers.Api.Forum
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumsController : ControllerBase
    {
        private readonly IPostService postService;
        private readonly UserManager<ApplicationUser> userManager;

        public ForumsController(IPostService postService,UserManager<ApplicationUser> userManager)
        {
            this.postService = postService;
            this.userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<PostMainCategoryModel> LoadForumCategories()
        {
            return this.postService.LoadPostCategories();
        }

        [HttpPost]
        [Route("post")]
        public async Task<IActionResult> CreateNewPost(CreatePostModel model)
        {
            var userId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            IsLoggedIn(userId);
            await this.postService.CreatePost(model, userId);
            return Ok();
        }

        [HttpPut]
        [Route("post")]
        public async Task<IActionResult> EditPostById(EditPostModel model)
        {
            var userId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            IsLoggedIn(userId);

            var isEdited = await this.postService.EditPost(model, userId);
            if (isEdited)
            {
                return Ok(GlobalConstants.EDIT_POST_SUCCESS);
            }
            return BadRequest(GlobalConstants.POST_NOT_FOUND);
        }

        [HttpPost]
        [Route("likes")]
        public async Task<IActionResult> Vote(VoteModel model)
        {
            if (model.IsLike != null)
            {
                await this.postService.CommentVote(model.UserId, model.CommentId, model.IsLike);
                return Ok(GlobalConstants.VOTE_ADD_SUCCESS);
            }
            else
            {
                await this.postService.RemoveVote(model.UserId, model.CommentId);
                return Ok(GlobalConstants.VOTE_REMOVE_SUCCESS);
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
            return await this.postService.LoadPostById(postId,true);
        }

        private void IsLoggedIn(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentException(GlobalConstants.NOT_LOGGED_IN_ERROR_MSG);
            }
        }
    }
}
