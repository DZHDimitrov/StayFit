namespace StayFit.Shared.Nutritions.Food.Requests
{
    using Microsoft.AspNetCore.Http;
    using StayFit.Common;
    using System.ComponentModel.DataAnnotations;

    public class CreateFoodModel
    {
        [StringLength(FoodConstants.Constraints.DescriptionMaxLength)]
        public string Description { get; set; }

        public int FoodTypeId { get; set; }

        public double Calories { get; set; }

        [Required]
        public IFormFile Image { get; set; }

        public int FoodCategoryId { get; set; }
    }
}
