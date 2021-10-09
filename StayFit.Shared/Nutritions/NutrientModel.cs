using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Nutritions
{
   public class NutrientModel
    {
        public string Name { get; set; }

        public IEnumerable<string> NutrientTypes { get; set; }
    }
}
