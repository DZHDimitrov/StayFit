using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public class FoodMinerals : BaseFoodNutrient
    {
        [ForeignKey(nameof(MineralType))]
        public int MineralTypeId { get; set; }

        public MineralType MineralType { get; set; }
    }
}
