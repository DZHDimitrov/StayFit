using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients
{
    public class VitaminType : BaseNutrient
    {
        public VitaminType()
        {
            this.FoodVitamins = new HashSet<FoodVitamins>();
        }

        public ICollection<FoodVitamins> FoodVitamins { get; set; }
    }
}
