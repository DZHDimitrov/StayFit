using StayFit.Data.Common.Models;
using StayFit.Data.Models.NutritionModels.Nutrients;
using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Data.Models
{
    public class Food : BaseDeletableModel<int>
    {

        public Food()
        {
            this.FoodCarbohydrates = new HashSet<FoodCarbohydrates>();
            this.FoodMinerals = new HashSet<FoodMinerals>();
            this.FoodAminoAcids = new HashSet<FoodAminoAcids>();
            this.FoodFats = new HashSet<FoodFats>();
            this.FoodMores = new HashSet<FoodMores>();
            this.FoodSterols = new HashSet<FoodSterols>();
            this.FoodVitamins = new HashSet<FoodVitamins>();
        }

        public string Description { get; set; }

        [ForeignKey(nameof(FoodType))]
        public int FoodTypeId { get; set; }

        public FoodType FoodType { get; set; }

        [ForeignKey(nameof(FoodCategory))]
        public int FoodCategoryId { get; set; }
        public FoodCategory FoodCategory { get; set; }

        public double Calories { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<FoodAminoAcids> FoodAminoAcids { get; set; }

        public ICollection<FoodCarbohydrates> FoodCarbohydrates { get; set; }

        public ICollection<FoodFats> FoodFats { get; set; }

        public ICollection<FoodMinerals> FoodMinerals { get; set; }

        public ICollection<FoodMores> FoodMores { get; set; }

        public ICollection<FoodSterols> FoodSterols { get; set; }

        public ICollection<FoodVitamins> FoodVitamins { get; set; }

    }
}
