using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many
{
    public class FoodSterols : BaseFoodNutrient
    {
        [ForeignKey(nameof(SterolType))]
        public int SterolTypeId { get; set; }

        public SterolType SterolType { get; set; }
    }
}
