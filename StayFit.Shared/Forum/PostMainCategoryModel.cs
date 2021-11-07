using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Forum
{
    public class PostMainCategoryModel
    {
        public string MainCategory { get; set; }

        public IEnumerable<PostSubCategoryModel> SubCategories { get; set; }
    }
}
