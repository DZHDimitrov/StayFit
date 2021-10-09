using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public class FoodVitamins : BaseFoodNutrient
    {
        [ForeignKey(nameof(VitaminType))]
        public int VitaminTypeId { get; set; }

        public VitaminType VitaminType { get; set; }
    }
}
