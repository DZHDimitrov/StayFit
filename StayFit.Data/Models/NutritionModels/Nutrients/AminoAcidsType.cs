using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models.NutritionModels.Nutrients
{
    public class AminoAcidsType : BaseNutrient
    {
        public AminoAcidsType()
        {
            this.FoodAminoAcids = new HashSet<FoodAminoAcids>();
        }

        public ICollection<FoodAminoAcids> FoodAminoAcids { get; set; }
    }
}
