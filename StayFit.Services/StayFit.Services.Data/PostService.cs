using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StayFit.Common;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.Forum;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Forum;
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

        public PostService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<PostModel> LoadPostById(int postId)
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
                    Comments = p.Comments.Select(c => new CommentModel
                    {
                        Id = c.Id,
                        Author = c.ApplicationUser.UserName,
                        CreatedOn = c.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                        ModifiedOn = test(c.ModifiedOn),
                        Content = c.Content,
                        Likes = c.Votes.Where(c => c.IsLike).Count(),
                        Dislikes = c.Votes.Where(c => !c.IsLike).Count()
                    })
                })
                .FirstOrDefaultAsync();
        }

        public IEnumerable<PostMainCategoryModel> LoadPostCategories()
        {
            return this.dbContext.PostMainCategories.Select(pmc => new PostMainCategoryModel
            {
                MainCategory = pmc.Name,
                SubCategories = pmc.PostSubCategories.Select(fsc => new PostSubCategoryModel
                {
                    Id = fsc.Id,
                    Name = fsc.Name,
                }).ToList()
            }).ToList();
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
                    LastCommentUsername = p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().ApplicationUser.UserName,
                    TimePassed = (DateTime.UtcNow.AddHours(2) - p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
                })
                .ToList();
        }


        private static string test(DateTime? date)
        {
            if (date != null)
            {
                return DateTime.Parse(date.ToString()).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
            }
            return null;
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

            var searchedVote = this.dbContext.UserVotes.FirstOrDefault(uv => uv.ApplicationUserId == userId && uv.Vote.Comment.Id == commentId)?.Vote;

            if (searchedVote != null)
            {
                if (searchedVote.IsLike && (bool)isLike)
                {
                    throw new ArgumentException(String.Format(GlobalConstants.SAME_VOTE_TYPE_ERROR_MSG,"liked"));

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
                .Include(uv=> uv.Vote)
                .FirstOrDefault(uv => uv.ApplicationUserId == userId && uv.Vote.Comment.Id == commentId);

            if (searchedVote == null)
            {
                throw new ArgumentException(GlobalConstants.NONEXISTANT_VOTE_ERROR_MSG);
            }

            this.dbContext.UserVotes.Remove(searchedVote);
            this.dbContext.Votes.Remove(searchedVote?.Vote);
            await this.dbContext.SaveChangesAsync();
        }
    }
}
