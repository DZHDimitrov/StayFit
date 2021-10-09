using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class ArticleCategory : BaseDeletableModel<int>
    {
        public ArticleCategory()
        {
            this.Articles = new HashSet<Article>();
        }

        public string Name { get; set; }

        ICollection<Article> Articles { get; set; }
    }
}
