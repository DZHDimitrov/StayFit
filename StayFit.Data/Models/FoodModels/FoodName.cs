namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodName : BaseDeletableModel<int>
    {
        public FoodName()
        {
            this.Foods = new HashSet<Food>();
            this.CategoryNames = new HashSet<CategoryFoodName>();
        }

        public string Name { get; set; }

        public ICollection<Food> Foods { get; set; }

        public ICollection<CategoryFoodName> CategoryNames { get; set; }
    }
}
