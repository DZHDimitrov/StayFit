namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Data.Common.Models;

    using System.Collections.Generic;

    public class FoodName : BaseDeletableModel<int>
    {
        public FoodName()
        {
            this.Foods = new HashSet<Food>();
        }

        public string Name { get; set; }

        public ICollection<Food> Foods { get; set; }
    }
}
