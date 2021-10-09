using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class FoodCategory : BaseDeletableModel<int>
    {
        public FoodCategory()
        {
            this.Foods = new HashSet<Food>();
        }

        public string Category { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Food> Foods { get; set; }
    }
}
