using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public abstract class BaseFoodNutrient : BaseDeletableModel<int>
    {
        [ForeignKey(nameof(Food))]
        public int FoodId { get; set; }

        public Food Food { get; set; }

        public double? Quantity { get; set; }
    }
}
