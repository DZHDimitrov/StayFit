using StayFit.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels
{
    public abstract class BaseNutrient : BaseDeletableModel<int>
    {
        public string Name { get; set; }
    }
}
