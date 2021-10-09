using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class FoodType : BaseDeletableModel<int>
    {
        public FoodType()
        {
            this.Foods = new HashSet<Food>();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<Food> Foods { get; set; }
    }
}
