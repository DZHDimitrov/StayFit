using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public class TypeCategories : BaseDeletableModel<int>
    {
        [ForeignKey(nameof(FoodType))]
        public int FoodTypeId { get; set; }

        public FoodType FoodType { get; set; }

        [ForeignKey(nameof(FoodCategory))]
        public int CategoryId { get; set; }

        public FoodCategory FoodCategory { get; set; }
    }
}
