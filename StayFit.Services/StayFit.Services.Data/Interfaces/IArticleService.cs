using StayFit.Shared.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IArticleService
    {
        public void CreateArticle(string id,CreateArticleRequestModel model);

        public void EditArticle();

        public void DeleteArticle();

        public IEnumerable<ArticleModel> GetLatestArticles();

        public IEnumerable<ArticleModel> GetAllArticles();
    }
}
