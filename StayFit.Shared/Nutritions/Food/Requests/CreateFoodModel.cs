namespace StayFit.Shared.Nutritions.Food.Requests
{
    using Microsoft.AspNetCore.Http;

    public class CreateFoodModel
    {
        public string Description { get; set; }

        public int FoodTypeId { get; set; }

        public double Calories { get; set; }

        public IFormFile Image { get; set; }

        public int FoodCategoryId { get; set; }
    }
}
