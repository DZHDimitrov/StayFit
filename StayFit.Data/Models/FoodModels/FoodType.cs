namespace StayFit.Data.Models.FoodModels
{
    using StayFit.Common;

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FoodType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public FoodType()
        {
            this.Foods = new HashSet<Food>();
            this.CategoryNames = new HashSet<CategoryFoodType>();
        }

        [Required]
        [StringLength(FoodConstants.Constraints.FoodTypeNameMaxLength)]
        public string Name { get; set; }

        public ICollection<Food> Foods { get; set; }

        public ICollection<CategoryFoodType> CategoryNames { get; set; }
    }
}
