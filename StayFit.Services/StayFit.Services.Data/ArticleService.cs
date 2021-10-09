using Microsoft.AspNetCore.Identity;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ArticleService : IArticleService
    {
        private readonly AppDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;

        public ArticleService(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }


        public void CreateArticle(string userId,CreateArticleRequestModel model)
        {
            Article article = new Article
            {
                Id = 0,
                Title = model.Title,
                Content = model.Content,
                CreatedOn = DateTime.Now,
                IsDeleted = false,
                OwnerId = userId,
                ImageUrl = model.ImageUrl,
            };
            var user = this.userManager.Users.FirstOrDefault(x => x.Id == userId);
            this.dbContext.Articles.Add(article);
            this.dbContext.SaveChanges();
        }

        public void DeleteArticle()
        {
            throw new NotImplementedException();
        }

        public void EditArticle()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ArticleModel> GetAllArticles()
        {
           return this.dbContext.Articles.Select(x => 
           new ArticleModel 
           {
               Id = x.Id, 
               Title = x.Title, 
               Content = x.Content,
               ImageUrl = x.ImageUrl
           })
                .ToList();
        }

        public IEnumerable<ArticleModel> GetLatestArticles()
        {
            return this.dbContext.Articles
                .OrderByDescending(x=>x.CreatedOn)
                .Take(4)
                .Select(x => 
                    new ArticleModel 
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Content = x.Content,
                        ImageUrl = x.ImageUrl,
                    })
                    .ToList();
        }
    }
}
