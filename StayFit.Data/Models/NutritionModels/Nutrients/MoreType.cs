using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients
{
    public class MoreType : BaseNutrient
    {
        public MoreType()
        {
            this.FoodMores = new HashSet<FoodMores>();
        }

        public ICollection<FoodMores> FoodMores { get; set; }
    }
}
