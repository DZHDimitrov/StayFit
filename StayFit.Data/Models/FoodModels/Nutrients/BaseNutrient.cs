namespace StayFit.Data.Models.FoodModels.Nutrients
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;

    public class BaseNutrient : BaseDeletableModel<int>
    {
        public BaseNutrient()
        {
            this.SubNutrients = new HashSet<SubNutrient>();
            this.BaseNutrients = new HashSet<FoodBaseNutrient>();
        }

        public string Name { get; set; }

        public ICollection<SubNutrient> SubNutrients { get; set; }

        public ICollection<FoodBaseNutrient> BaseNutrients { get; set; }
    }
}
