using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public class FoodMores : BaseFoodNutrient
    {
        [ForeignKey(nameof(MoreType))]
        public int MoreTypeId { get; set; }

        public MoreType MoreType { get; set; }
    }
}
