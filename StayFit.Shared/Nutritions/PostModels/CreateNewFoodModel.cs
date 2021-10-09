using StayFit.Shared.Nutritions.PostModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Nutritions
{
    public class CreateNewFoodModel
    {
        [Required]
        [MinLength(3)]
        public string Description { get; set; }

        [Required]
        public int FoodTypeId { get; set; }

        [Required]
        public double Calories { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public int FoodCategoryId { get; set; }

        public IEnumerable<CarbohydratesModel> Carbohydrates { get; set; }

        public IEnumerable<VitaminsModel> Vitamins { get; set; }

        public IEnumerable<SterolsModel> Sterols { get; set; }

        public IEnumerable<MoresModel> Mores { get; set; }

        public IEnumerable<MineralsModel> Minerals { get; set; }

        public IEnumerable<FatsModel> Fats { get; set; }

        public IEnumerable<AminoAcidsModel> Aminoacids { get; set; }
    }
}
