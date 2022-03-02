namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodType : BaseDeletableModel<int>
    {
        public FoodType()
        {
            this.Foods = new HashSet<Food>();
            this.CategoryNames = new HashSet<CategoryFoodType>();
        }

        public string Name { get; set; }

        public ICollection<Food> Foods { get; set; }

        public ICollection<CategoryFoodType> CategoryNames { get; set; }
    }
}
