using StayFit.Data.Common.Models;
using StayFit.Data.Models.NutritionModels;
using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class CarbohydrateType : BaseNutrient
    {
        public CarbohydrateType()
        {
            this.FoodCarbohydrates = new HashSet<FoodCarbohydrates>();
        }

        public ICollection<FoodCarbohydrates> FoodCarbohydrates { get; set; }
    }
}
