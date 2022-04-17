//using AutoMapper;
//using AutoMapper.QueryableExtensions;
//using Microsoft.EntityFrameworkCore;
//using StayFit.Common;
//using StayFit.Data;
//using StayFit.Data.Models.Forum;
//using StayFit.Infrastructure.CustomErros;
//using StayFit.Services.StayFit.Services.Data.Interfaces;
//using StayFit.Shared.Forum;
//using StayFit.Shared.Forum.PostModels;
//using StayFit.Shared.Forum.Responses;
//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.Linq;
//using System.Threading.Tasks;

//namespace StayFit.Services.StayFit.Services.Data
//{
//    public class PostService : IPostService
//    {
//        private readonly AppDbContext dbContext;
//        private readonly IMapper mapper;

//        public PostService(AppDbContext dbContext, IMapper mapper)
//        {
//            this.dbContext = dbContext;
//            this.mapper = mapper;
//        }

//        public async Task<LoadPostResponse> LoadPostById(int postId)
//        {
//            var post = await this.dbContext
//                .Posts
//                .Where(p => p.Id == postId)
//                .Select(p => new PostModel
//                {
//                    Id = p.Id,
//                    CreatedOn = p.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
//                    ModifiedOn = p.CreatedOn.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
//                    Author = p.ApplicationUser.UserName,
//                    Content = p.Content,
//                })
//                .FirstOrDefaultAsync();
//            return new LoadPostResponse
//            {
//                Post = post,
//            };
//        }

//        public async Task<LoadPostCategoriesResponse> LoadPostCategories()
//        {
//            var postCategories = await this.dbContext
//                .PostMainCategories
//                .ProjectTo<PostMainCategoryModel>(this.mapper.ConfigurationProvider)
//                .ToListAsync();
//            return new LoadPostCategoriesResponse
//            {
//                PostMainCategories = postCategories,
//            };
//        }

//        public async Task<LoadPostPreviewsResponse> LoadPostPreviewsByCategory(int categoryId,int? page = 1)
//        {
//            var response = new LoadPostPreviewsResponse
//            {
//                Page = page ?? 1,
//                Count = this.dbContext.Posts.Where(p => p.PostSubCategory.Id == categoryId).Count(),
//            };

//            var skip = (response.Page - 1) * response.ItemsPerPage;

//            var postPreviews = await dbContext.Posts
//                .Where(p => p.PostSubCategory.Id == categoryId)
//                .Select(p => new PostPreviewModel
//                {
//                    Title = p.Title,
//                    Author = p.ApplicationUser.UserName,
//                    LastCommentUsername =
//                    p.Comments.Count == 0 ? null :
//                    p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().ApplicationUser.UserName,
//                    TimePassed = p.Comments.Count == 0 ? null :
//                    (DateTime.UtcNow.AddHours(2) - p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
//                })
//                .Skip(skip)
//                .Take(response.ItemsPerPage)
//                .ToListAsync();

//            response.PostPreviews = postPreviews;
//            return response;
//        }

//        public async Task<AddPostResponse> CreatePost(AddPostRequest model, string userId)
//        {
//            var post = new Post
//            {
//                ApplicationUserId = userId,
//                Content = model.Content,
//                CreatedOn = DateTime.UtcNow.AddHours(2),
//                IsDeleted = false,
//                PostSubCategoryId = model.PostSubCategoryId,
//                Title = model.Title,
//            };

//            await this.dbContext.Posts.AddAsync(post);
//            await this.dbContext.SaveChangesAsync();

//            return new AddPostResponse
//            {
//                PostId = post.Id,
//                Title = post.Title,
//            };
//        }

//        public async Task<EditPostResponse> EditPost(EditPostRequest model, string userId)
//        {
//            var post = await this.dbContext
//                .Posts
//                .Include(x => x.ApplicationUser)
//                .FirstOrDefaultAsync(p => p.Id == model.PostId);

//            if (post == null)
//            {
//                throw new NotFoundException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "post"));
//            }

//            if (post.ApplicationUserId != userId)
//            {
//                throw new UnallowedException(string.Format(GlobalConstants.UNABLE_TO_MODIFY, "edit","post"));
//            }

//            post.Title = model.Title;
//            post.Content = model.Content;
//            post.ModifiedOn = DateTime.UtcNow;
//            post.PostSubCategoryId = model.PostSubCategoryId;

//            await this.dbContext.SaveChangesAsync();

//            return new EditPostResponse
//            {
//                Id = post.Id,
//                Title = post.Title,
//                Content = post.Content,
//            };
//        }

//        public async Task<DeletePostResponse> RemovePost(int postId, string userId)
//        {
//            var post = await this.dbContext
//                .Posts
//                .Include(p => p.ApplicationUser)
//                .FirstOrDefaultAsync(p => p.Id == postId);

//            if (post == null)
//            {
//                throw new ArgumentException("Invalid postid");
//                //throw new InvalidRequestException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "post"));
//            }
//            if (post.ApplicationUser.Id != userId)
//            {
//                throw new UnallowedException(string.Format(GlobalConstants.UNABLE_TO_MODIFY, "delete", "post"));
//            }

//            this.dbContext.Posts.Remove(post);
//            await this.dbContext.SaveChangesAsync();

//            return new DeletePostResponse 
//            { 
//                Id = post.Id 
//            };

//        }

//        public async Task<LoadPostPreviewsResponse> LoadUserPosts(string userId)
//        {
//            var previews =  await this.dbContext
//                .Posts
//                .Where(p => p.ApplicationUser.Id == userId)
//                .Select(p => new PostPreviewModel
//                {
//                    Title = p.Title,
//                    Author = p.ApplicationUser.UserName,
//                    LastCommentUsername = p.Comments.Count == 0 ? null :
//                                          p.Comments
//                                          .OrderByDescending(c => c.CreatedOn)
//                                          .FirstOrDefault().ApplicationUser.UserName,
//                    TimePassed = p.Comments.Count == 0 ? null :
//                    (DateTime.UtcNow.AddHours(2) - p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
//                })
//                .ToListAsync();

//            return new LoadPostPreviewsResponse
//            {
//                PostPreviews = previews,
//            };
//        }

//        public async Task<LoadPostPreviewsResponse> LoadActivePosts(int? postCount)
//        {
//            var postPreviews = await this.dbContext
//                .Posts
//                .OrderByDescending(x => x.Comments
//                                         .OrderByDescending(y => y.CreatedOn)
//                                         .FirstOrDefault().CreatedOn)
//                .Select(x => new PostPreviewModel
//                {
//                    Title = x.Title,
//                    Author = x.ApplicationUser.UserName,
//                    LastCommentUsername = x.Comments.Count == 0 ? null :
//                                          x.Comments
//                                           .OrderByDescending(c => c.CreatedOn)
//                                           .Select(c => c.ApplicationUser.UserName)
//                                           .FirstOrDefault(),
//                    TimePassed = x.Comments.Count == 0 ? null :
//                    (DateTime.UtcNow.AddHours(2) - x.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
//                })
//                .Take(postCount != null ? (int)postCount : this.dbContext.Posts.Count())
//                .ToListAsync();

//            return new LoadPostPreviewsResponse
//            {
//                PostPreviews = postPreviews,
//            };
//        }

//        public async Task<LoadPostPreviewsResponse> LoadRecentPosts()
//        {
//            var postPreviews =  await this.dbContext
//               .Posts
//               .OrderByDescending(p => p.CreatedOn)
//               .Select(p => new PostPreviewModel
//               {
//                   Title = p.Title,
//                   Author = p.ApplicationUser.UserName,
//                   LastCommentUsername = p.Comments.Count == 0 ? null :
//                                         p.Comments
//                                          .OrderByDescending(c => c.CreatedOn)
//                                          .FirstOrDefault().ApplicationUser.UserName,
//                   TimePassed = p.Comments.Count == 0 ? null :
//                   (DateTime.UtcNow.AddHours(2) - p.Comments.OrderByDescending(c => c.CreatedOn).FirstOrDefault().CreatedOn).TotalSeconds
//               })
//               .ToListAsync();

//            return new LoadPostPreviewsResponse
//            {
//                PostPreviews = postPreviews,
//            };
//        }
//    }
//}
