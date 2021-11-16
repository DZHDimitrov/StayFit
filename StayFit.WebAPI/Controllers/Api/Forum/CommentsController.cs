namespace StayFit.WebAPI.Controllers.Api.Forum
{
    using StayFit.Common;

    using StayFit.Shared;
    using StayFit.Shared.Forum.Responses;
    using StayFit.Shared.Forum.PostModels;
    using StayFit.Shared.Forum.DeleteModels;

    using StayFit.Services.StayFit.Services.Data.Interfaces;

    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    using StayFit.Infrastructure.Extensions;

    [Route("api/forums/[controller]")]
    [Authorize]
    [ApiController]
    public class CommentsController : BaseController
    {
        private readonly ICommentService commentService;

        public CommentsController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("post")]
        public async Task<ApiResponse<LoadPostCommentsResponse>>LoadCommentsByPostId([FromQuery]int id)
        {
            var response = await this.commentService.LoadCommentsByPostId(id);
            return response.ToApiResponse();
        }

        [HttpPost]
        public async Task<ApiResponse<AddCommentResponse>> CreateComment(AddCommentRequest model)
        {
            var userId = this.User.GetId();
            var response = await this.commentService.CreateComment(model,userId);
            return response.ToApiResponse();
        }

        [HttpPut]
        public IActionResult EditComment()
        {
            return Ok();
        }

        [HttpDelete]
        public async Task<ApiResponse<DeleteCommentResponse>> DeleteComment(DeleteCommentModel model)
        {
            var userId = this.User.GetId();
            var response = await this.commentService.DeleteComment(model,userId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("votes")]
        public IActionResult LoadVotesByCommentId()
        {
            return Ok();
        }

        [HttpPost]
        [Route("votes")]
        public async Task<IActionResult> CommentVote(VoteModel model)
        {
            var userId = this.User.GetId();
            await this.commentService.CommentVote(userId, model.CommentId, model.IsLike);
            return Ok(string.Format(GlobalConstants.ITEM_ADD_SUCCESS, "vote"));
        }

        [HttpPut]
        [Route("votes")]
        public async Task<IActionResult> EditVoteById(VoteModel model)
        {
            var userId = this.User.GetId();
            await this.commentService.EditVote(userId, model.CommentId, model.IsLike);
            return Ok();
        }

        [HttpDelete]
        [Route("votes")]
        public async Task<IActionResult> RemoveVoteByPostId(VoteModel model)
        {
            var userId = this.User.GetId();
            await this.commentService.RemoveVote(userId, model.CommentId);
            return Ok(string.Format(GlobalConstants.ITEM_REMOVE_SUCCESS, "vote"));
        }

        [HttpGet]
        [Route("chosen")]
        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadChosenComents()
        {
            var userId = this.User.GetId();
            var response = await this.commentService.LoadChosenComments(userId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("my_comments")]
        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadUserComments()
        {
            var userId = this.User.GetId();
            var response = await this.commentService.LoadUserComments(userId);
            return response.ToApiResponse();
        }

        [HttpGet]
        [Route("recent")]
        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadNewComments()
        {
            var response = await this.commentService.LoadNewComments();
            return response.ToApiResponse();
        }
    }
}
