using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Articles
{
    public class CreateArticleRequestModel
    {
        [Required]
        public string Title { get; set; }

        public string Username { get; set; }

        [Required]
        [MinLength(20)]
        public string Content { get; set; }

        public string ImageUrl { get; set; }
    }
}
