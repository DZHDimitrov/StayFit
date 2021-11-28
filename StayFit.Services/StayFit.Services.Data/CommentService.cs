using StayFit.Data;
using StayFit.Common;
using StayFit.Shared.Forum;
using StayFit.Data.Models.Forum;
using StayFit.Shared.Forum.Responses;
using StayFit.Shared.Forum.PostModels;
using StayFit.Shared.Forum.DeleteModels;
using StayFit.Infrastructure.CustomErros;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace StayFit.Services.StayFit.Services.Data
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext dbContext;

        public CommentService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<AddVoteResponse> CommentVote(string userId, string commentId, bool? isLike)
        {
            var comment = await this.dbContext.Comments
                .Include(c => c.Votes)
                .ThenInclude(c=>c.ApplicationUser)
                .FirstOrDefaultAsync(x => x.Id == commentId);

            if (comment.ApplicationUserId == userId)
            {
                throw new InvalidRequestException(GlobalConstants.SELF_COMMENT_VOTE_ERROR_MSG);
            }

            var searchedVote = await this.dbContext.Votes.FirstOrDefaultAsync(v => v.CommentId == commentId && v.ApplicationUserId == userId);
            if (searchedVote != null)
            {
                throw new InvalidRequestException(GlobalConstants.ALREADY_VOTED_ERROR_MSG);
            }

            Vote vote = new Vote
            {
                Id = Guid.NewGuid().ToString(),
                CommentId = comment.Id,
                CreatedOn = DateTime.UtcNow.AddHours(2),
                ModifiedOn = null,
                IsDeleted = false,
                IsLike = (bool)isLike
            };
            this.dbContext.Votes.Add(vote);
            this.dbContext.Users.FirstOrDefault(u => u.Id == userId).Votes.Add(vote);
            await this.dbContext.SaveChangesAsync();

            return new AddVoteResponse
            {
                IsAdded = true,
            };
        }

        public async Task<AddCommentResponse> CreateComment(AddCommentRequest model,string userId)
        {
            var comment = new Comment
            {
                Id = Guid.NewGuid().ToString(),
                ApplicationUserId = userId,
                CreatedOn = DateTime.UtcNow,
                Content = model.Content,
                PostId = model.PostId,
                IsDeleted = false,
            };
            await this.dbContext.Comments.AddAsync(comment);
            await this.dbContext.SaveChangesAsync();

            return new AddCommentResponse
            {
                Id = comment.Id,
                Content = comment.Content
            };
        }

        public async Task<DeleteCommentResponse> DeleteComment(string commentId,string userId)
        {
            var commentToDelete = await this.dbContext.Comments
                 .Include(c => c.ApplicationUser)
                 .FirstOrDefaultAsync(c => c.Id == commentId);

            if (commentToDelete == null)
            {
                throw new NotFoundException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "comment"));
            }

            if (commentToDelete.ApplicationUserId != userId)
            {
                throw new UnallowedException(string.Format(GlobalConstants.UNABLE_TO_MODIFY, "delete", "comment"));
            }

            this.dbContext.Comments.Remove(commentToDelete);
            await this.dbContext.SaveChangesAsync();

            return new DeleteCommentResponse
            {
                Id = commentToDelete.Id
            };
        }

        public async Task EditComment(EditCommentRequest model,string userId)
        {
            var commentToEdit = await this.dbContext.Comments
                .Include(c=> c.ApplicationUser)
                .FirstOrDefaultAsync(c => c.Id == model.CommentId);

            if (commentToEdit == null)
            {
                throw new NotFoundException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "comment"));
            }

            if (commentToEdit.ApplicationUserId == userId)
            {
                throw new UnallowedException(string.Format(GlobalConstants.UNABLE_TO_MODIFY, "edit", "comment"));
            }

            commentToEdit.Content = model.Content;
            commentToEdit.ModifiedOn = DateTime.UtcNow.AddHours(2);

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<ModifyVoteResponse> EditVote(string userId, string commentId, bool? isLike)
        {
            var searchedVote = await this.dbContext.Votes.FirstOrDefaultAsync(v => v.ApplicationUserId == userId && v.CommentId == commentId);

            if (searchedVote == null)
            {
                throw new InvalidRequestException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "vote"));
            }

            searchedVote.IsLike = (bool)isLike;
            await this.dbContext.SaveChangesAsync();
            return new ModifyVoteResponse
            {
                IsModified = true,
            };
        }

        public async Task<LoadCommentPreviewResponse> LoadChosenComments(string userId)
        {
            var commentPreviews = await this.dbContext.UserChosenComments
                       .Where(ucc => ucc.ApplicationUserId == userId)
                       .OrderByDescending(ucc => ucc.Comment.CreatedOn)
                       .Select(ucc => new CommentPreviewModel
                       {
                           Id = ucc.CommentId,
                           PostId = ucc.Comment.PostId,
                           CreatedOn = ucc.Comment.CreatedOn,
                           Author = ucc.Comment.ApplicationUser.UserName,
                           Content = ucc.Comment.Content
                           
                       })
                       .ToListAsync();

            return new LoadCommentPreviewResponse
            {
                CommentPreviews = commentPreviews,
            };
        }

        public async Task<LoadPostCommentsResponse> LoadCommentsByPostId(int? postId)
        {
            if (!this.dbContext.Posts.Any(p => p.Id == postId) || postId == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "post"));
            }

            var comments = await this.dbContext.Comments
                .Where(c => c.PostId == postId)
                .Select(c=> new CommentModel 
                {
                    Id = c.Id,
                    Author = c.ApplicationUser.UserName,
                    CreatedOn = c.CreatedOn,
                    ModifiedOn = c.ModifiedOn,
                    Content = c.Content,
                    Likes = c.Votes.Where(c => c.IsLike).Count(),
                    Dislikes = c.Votes.Where(c => !c.IsLike).Count()
                })
                .ToListAsync();

            return new LoadPostCommentsResponse
            {
                Comments = comments,
            };
        }

        public async Task<LoadCommentPreviewResponse> LoadNewComments()
        {
            var commentPreviews =  await this.dbContext.Comments
                .OrderByDescending(c => c.CreatedOn)
                .Select(c => new CommentPreviewModel
                {
                    Id = c.Id,
                    Author = c.ApplicationUser.UserName,
                    CreatedOn = c.CreatedOn,
                    PostId = c.PostId,
                    Content = c.Content
                })
                .ToListAsync();

            return new LoadCommentPreviewResponse
            {
                CommentPreviews = commentPreviews,
            };
        }

        public async Task<LoadCommentPreviewResponse> LoadUserComments(string userId)
        {
            var commentPreviews = await this.dbContext.Comments
                .Where(c => c.ApplicationUserId == userId)
                .Select(c => new CommentPreviewModel
                {
                    Id = c.Id,
                    Author = c.ApplicationUser.UserName,
                    CreatedOn = c.CreatedOn,
                    PostId = c.PostId,
                    Content = c.Content
                })
                .ToListAsync();

            return new LoadCommentPreviewResponse
            {
                CommentPreviews = commentPreviews,
            };
        }

        public async Task<ModifyVoteResponse> RemoveVote(string userId, string commentId)
        {
            var searchedVote = await this.dbContext.Votes.FirstOrDefaultAsync(v => v.CommentId == commentId && v.ApplicationUserId == userId);

            if (searchedVote == null)
            {
                throw new InvalidRequestException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "vote"));
            }

            this.dbContext.Votes.Remove(searchedVote);
            await this.dbContext.SaveChangesAsync();
            return new ModifyVoteResponse
            {
                IsModified = true,
            };
        }
    }
}
