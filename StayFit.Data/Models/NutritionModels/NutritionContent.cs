using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class NutritionContent : BaseDeletableModel<int>
    {
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        [ForeignKey(nameof(NutritionCategory))]
        public int NutritionCategoryId { get; set; }

        public NutritionCategory NutritionCategory { get; set; }
    }
}
