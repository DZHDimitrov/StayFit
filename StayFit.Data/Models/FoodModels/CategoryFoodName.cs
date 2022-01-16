using System.ComponentModel.DataAnnotations.Schema;

namespace StayFit.Data.Models.FoodModels
{
    public class CategoryFoodName
    {

        [ForeignKey(nameof(FoodCategory))]
        public int FoodCategoryId { get; set; }

        public FoodCategory FoodCategory { get; set; }

        [ForeignKey(nameof(FoodName))]
        public int FoodNameId { get; set; }

        public FoodName FoodName {get;set;}
    }
}
