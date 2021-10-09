using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Nutritions
{
    public abstract class BaseNutrientsModel
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public double? Quantity { get; set; }
    }
}
