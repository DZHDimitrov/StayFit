namespace StayFit.Data.Models.FoodModels.Nutrients
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodBaseNutrient
    {
        [ForeignKey(nameof(Food))]
        public int FoodId { get; set; }

        public Food Food { get; set; }

        [ForeignKey(nameof(BaseNutrient))]
        public int BaseNutrientId { get; set; }

        public BaseNutrient BaseNutrient { get; set; }

        public double? Quantity { get; set; }
    }
}
