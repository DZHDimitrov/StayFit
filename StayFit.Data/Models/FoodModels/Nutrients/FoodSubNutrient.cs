namespace StayFit.Data.Models.FoodModels.Nutrients
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodSubNutrient
    {
        [ForeignKey(nameof(Food))]
        public int FoodId { get; set; }

        public Food Food { get; set; }

        [ForeignKey(nameof(SubNutrient))]
        public int SubNutrientId { get; set; }

        public SubNutrient SubNutrient { get; set; }

        public double? Quantity { get; set; }
    }
}
