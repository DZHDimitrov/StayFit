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
    public class MineralType : BaseNutrient
    {
        public MineralType()
        {
            this.FoodMinerals = new HashSet<FoodMinerals>();
        }

        public ICollection<FoodMinerals> FoodMinerals { get; set; }
    }
}
    