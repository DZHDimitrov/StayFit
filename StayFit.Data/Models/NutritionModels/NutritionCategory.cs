using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class NutritionCategory : BaseDeletableModel<int>
    {
        public NutritionCategory()
        {
            this.NutritionContents = new HashSet<NutritionContent>();
        }

        public string Category { get; set; }

        public ICollection<NutritionContent> NutritionContents { get; set; }
    }
}
