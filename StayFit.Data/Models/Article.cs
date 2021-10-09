using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class Article : BaseDeletableModel<int>
    {
        public Article()
        {
            this.UserArticles = new HashSet<UserArticles>();
        }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ImageUrl { get; set; }

        [ForeignKey(nameof(ArticleCategory))]
        public int ArticleCategoryId { get; set; }

        public ArticleCategory ArticleCategory { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public string OwnerId { get; set; }

        public ApplicationUser Owner { get; set; }

        public ICollection<UserArticles> UserArticles { get; set; }
    }
}
