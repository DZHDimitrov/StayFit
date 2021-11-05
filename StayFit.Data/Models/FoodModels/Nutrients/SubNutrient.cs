namespace StayFit.Data.Models.FoodModels.Nutrients
{
    using StayFit.Data.Common.Models;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class SubNutrient : BaseDeletableModel<int>
    {
        public SubNutrient()
        {
            this.FoodSubNutrients = new HashSet<FoodSubNutrient>();
        }

        public string Name { get; set; }

        [ForeignKey(nameof(BaseNutrient))]
        public int BaseNutrientId { get; set; }

        public BaseNutrient BaseNutrient { get; set; }

        public ICollection<FoodSubNutrient> FoodSubNutrients { get; set; }
    }
}
