namespace StayFit.Data.Models.FoodModels
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

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
