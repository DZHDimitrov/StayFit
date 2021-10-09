using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients
{
    public class SterolType : BaseNutrient
    {
        public SterolType()
        {
            this.FoodSterols = new HashSet<FoodSterols>();
        }

        public ICollection<FoodSterols> FoodSterols { get; set; }
    }
}
