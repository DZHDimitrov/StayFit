namespace StayFit.Data.Models.FoodModels.Nutrients
{
    using StayFit.Common;
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class BaseNutrient : BaseModel<int>
    {
        public BaseNutrient()
        {
            this.SubNutrients = new HashSet<SubNutrient>();
            this.BaseNutrients = new HashSet<FoodBaseNutrient>();
        }

        [Required]
        [StringLength(FoodConstants.Constraints.BaseNutrientMaxLength)]
        public string Name { get; set; }

        public ICollection<SubNutrient> SubNutrients { get; set; }

        public ICollection<FoodBaseNutrient> BaseNutrients { get; set; }
    }
}
