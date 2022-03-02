namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;

    public class FoodCategory : BaseDeletableModel<int>
    {
        public FoodCategory()
        {
            this.Foods = new HashSet<Food>();
            this.CategoryNames = new HashSet<CategoryFoodType>();
        }

        public string Category { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Food> Foods { get; set; }

        public ICollection<CategoryFoodType> CategoryNames { get; set; }
    }
}
