//namespace StayFit.WebAPI.Controllers.Api.Forum
//{
//    using StayFit.Common;

//    using StayFit.Shared;
//    using StayFit.Shared.Forum.Responses;
//    using StayFit.Shared.Forum.PostModels;
//    using StayFit.Shared.Forum.DeleteModels;

//    using StayFit.Services.StayFit.Services.Data.Interfaces;

//    using System.Threading.Tasks;

//    using Microsoft.AspNetCore.Mvc;
//    using Microsoft.AspNetCore.Authorization;

//    using StayFit.Infrastructure.Extensions;

//    [Route("api/forums/[controller]")]
//    [AllowAnonymous]
//    [ApiController]
//    public class CommentsController : BaseController
//    {
//        private readonly ICommentService commentService;

//        public CommentsController(ICommentService commentService)
//        {
//            this.commentService = commentService;
//        }

//        [HttpGet]
//        [AllowAnonymous]
//        [Route("post")]
//        public async Task<ApiResponse<LoadPostCommentsResponse>>LoadCommentsByPostId([FromQuery]int? id)
//        {
//            var response = await this.commentService.LoadCommentsByPostId(id);
//            return response.ToApiResponse();
//        }

//        [HttpPost]
//        public async Task<ApiResponse<AddCommentResponse>> CreateComment(AddCommentRequest model)
//        {
//            var userId = this.User.GetId();
//            var response = await this.commentService.CreateComment(model,userId);
//            return response.ToApiResponse();
//        }

//        [HttpPut]
//        public IActionResult EditComment()
//        {
//            return Ok();
//        }

//        [HttpDelete]
//        [Route("{commentId}")]
//        public async Task<ApiResponse<DeleteCommentResponse>> DeleteComment(string commentId)
//        {
//            var userId = this.User.GetId();
//            var response = await this.commentService.DeleteComment(commentId,userId);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("{commentId}/votes")]
//        public IActionResult LoadVotesByCommentId()
//        {
//            return Ok();
//        }

//        [HttpPost]
//        [Route("{commentId}/votes")]
//        public async Task<ApiResponse<AddVoteResponse>> CommentVote(string commentId,VoteModel model)
//        {
//            //var userId = this.User.GetId();
//            var userId = "1";
//            var response = await this.commentService.CommentVote(userId, commentId, model.IsLike);
//            return response.ToApiResponse();
//        }

//        [HttpPut]
//        [Route("{commentId}/votes")]
//        public async Task<ApiResponse<ModifyVoteResponse>> EditVoteById(string commentId,VoteModel model)
//        {
//            //var userId = this.User.GetId();
//            var userId = "1";
//            var response = await this.commentService.EditVote(userId, commentId, model.IsLike);
//            return response.ToApiResponse();
//        }

//        [HttpDelete]
//        [Route("{commentId}/votes")]
//        public async Task<ApiResponse<ModifyVoteResponse>> RemoveVoteByPostId(string commentId,VoteModel model)
//        {
//            var userId = this.User.GetId();
//            var response = await this.commentService.RemoveVote(userId, commentId);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("chosen")]
//        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadChosenComents()
//        {
//            var userId = this.User.GetId();
//            var response = await this.commentService.LoadChosenComments(userId);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("my_comments")]
//        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadUserComments()
//        {
//            var userId = this.User.GetId();
//            var response = await this.commentService.LoadUserComments(userId);
//            return response.ToApiResponse();
//        }

//        [HttpGet]
//        [Route("recent")]
//        public async Task<ApiResponse<LoadCommentPreviewResponse>> LoadNewComments()
//        {
//            var response = await this.commentService.LoadNewComments();
//            return response.ToApiResponse();
//        }
//    }
//}
