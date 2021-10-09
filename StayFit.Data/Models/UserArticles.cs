using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class UserArticles : BaseDeletableModel<int>
    {

        public string ApplicationUserId { get; set; }

        public ApplicationUser User { get; set; }

        public int ArticleId { get; set; }

        public Article Article { get; set; }
    }
}
