using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using StayFit.Common;
using StayFit.Data;
using StayFit.Data.Models.Forum;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Forum;
using StayFit.Shared.Forum.PostModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class PostService : IPostService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public PostService(AppDbContext dbContext,IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<PostModel> LoadPostById(int postId, bool withComments)
        {

            return await this.dbContext
                .Posts
                .Where(p => p.Id == postId)
                .Select(p => new PostModel
                {
                    Id = p.Id,
                    CreatedOn = p.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                    ModifiedOn = p.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                    Author = p.ApplicationUser.UserName,
                    Content = p.Content,
                    Comments = !withComments ? null : p.Comments.Select(c => new CommentModel
                    {
                        Id = c.Id,
                        Author = c.ApplicationUser.UserName,
                        CreatedOn = c.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                        ModifiedOn = FromatDate(c.ModifiedOn),
                        Content = c.Content,
                        Likes = c.Votes.Where(c => c.IsLike).Count(),
                        Dislikes = c.Votes.Where(c => !c.IsLike).Count()
                    })
                })
                .FirstOrDefaultAsync();
        }

        public IEnumerable<PostMainCategoryModel> LoadPostCategories()
        {
            return this.dbContext
                .PostMainCategories
                .ProjectTo<PostMainCategoryModel>(this.mapper.ConfigurationProvider)
                .ToList();
        }

        public IEnumerable<PostPreviewModel> LoadPostPreviewsByCategory(int categoryId)
        {
            return dbContext
                .Posts
                .Where(p => p.PostSubCategory.Id == categoryId)
                .Select(p => new PostPreviewModel
                {
                    Title = p.Title,
                    Username = p.ApplicationUser.UserName,
                    LastCommentUsername =
                    p.Comments.Count == 0 ? null :
                    p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().ApplicationUser.UserName,
                    TimePassed = p.Comments.Count == 0 ? null :
                    (DateTime.UtcNow.AddHours(2) - p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
                })
                .ToList();
        }

        public async Task CommentVote(string userId, string commentId, bool? isLike)
        {
            var comment = await this.dbContext.Comments
                .Include(x => x.Votes)
                .ThenInclude(x => x.UserVotes)
                .ThenInclude(x => x.ApplicationUser)
                .FirstOrDefaultAsync(c => c.Id == commentId);


            if (comment.ApplicationUserId == userId)
            {
                throw new ArgumentException(GlobalConstants.SELF_COMMENT_VOTE_ERROR_MSG);
            }

            var searchedVote = this.dbContext.UserVotes
                .FirstOrDefault(uv => uv.ApplicationUserId == userId && uv.Vote.Comment.Id == commentId)?.Vote;

            if (searchedVote != null)
            {
                if (searchedVote.IsLike && (bool)isLike)
                {
                    throw new ArgumentException(String.Format(GlobalConstants.SAME_VOTE_TYPE_ERROR_MSG, "liked"));

                }
                else if (searchedVote.IsLike && (bool)!isLike)
                {
                    searchedVote.IsLike = false;
                }
                else if (!searchedVote.IsLike && (bool)isLike)
                {
                    searchedVote.IsLike = true;
                }
                else if (!searchedVote.IsLike && (bool)!isLike)
                {
                    throw new ArgumentException(String.Format(GlobalConstants.SAME_VOTE_TYPE_ERROR_MSG, "disliked"));
                }
                await this.dbContext.SaveChangesAsync();
                return;
            }

            Vote vote = new Vote
            {
                Id = Guid.NewGuid().ToString(),
                CommentId = comment.Id,
                CreatedOn = DateTime.UtcNow.AddHours(2),
                ModifiedOn = null,
                IsDeleted = false,
                IsLike = (bool)isLike,
            };

            this.dbContext.Votes.Add(vote);

            UserVote userLike = new UserVote
            {
                ApplicationUserId = userId,
                VoteId = vote.Id
            };

            this.dbContext.UserVotes.Add(userLike);

            await this.dbContext.SaveChangesAsync();
        }

        public async Task RemoveVote(string userId, string commentId)
        {
            var searchedVote = this.dbContext
                .UserVotes
                .Include(uv => uv.Vote)
                .FirstOrDefault(uv => uv.ApplicationUserId == userId && uv.Vote.Comment.Id == commentId);

            if (searchedVote == null)
            {
                throw new ArgumentException(GlobalConstants.NONEXISTANT_VOTE_ERROR_MSG);
            }

            this.dbContext.UserVotes.Remove(searchedVote);
            this.dbContext.Votes.Remove(searchedVote?.Vote);
            await this.dbContext.SaveChangesAsync();
        }


        private static string FromatDate(DateTime? date)
        {
            if (date != null)
            {
                return DateTime.Parse(date.ToString()).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
            }
            return null;
        }

        public async Task CreatePost(CreatePostModel model, string userId)
        {
            var post = new Post
            {
                ApplicationUserId = userId,
                Content = model.Content,
                CreatedOn = DateTime.UtcNow.AddHours(2),
                IsDeleted = false,
                PostSubCategoryId = model.PostSubCategoryId,
                Title = model.Title,
            };
            await this.dbContext.Posts.AddAsync(post);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> EditPost(EditPostModel model, string userId)
        {
            var post = await this.dbContext
                .Posts
                .Include(x => x.ApplicationUser)
                .FirstOrDefaultAsync(p => p.Id == model.PostId);

            if (post != null)
            {
                if (post.ApplicationUser.Id != userId)
                {
                    throw new ArgumentException(string.Format(GlobalConstants.UNABLE_TO_EDIT,"post"));
                }

                post.Title = model.Title;
                post.Content = model.Content;
                post.ModifiedOn = DateTime.UtcNow.AddHours(2);
                post.PostSubCategoryId = model.PostSubCategoryId;
                await this.dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
