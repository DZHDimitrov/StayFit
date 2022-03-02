using System.ComponentModel.DataAnnotations.Schema;

namespace StayFit.Data.Models.FoodModels
{
    public class CategoryFoodType
    {

        [ForeignKey(nameof(FoodCategory))]
        public int FoodCategoryId { get; set; }

        public FoodCategory FoodCategory { get; set; }

        [ForeignKey(nameof(FoodType))]
        public int FoodTypeId { get; set; }

        public FoodType FoodType {get;set;}
    }
}
