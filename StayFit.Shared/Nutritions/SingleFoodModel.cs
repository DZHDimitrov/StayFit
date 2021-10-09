using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Nutritions
{
    public class SingleFoodModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Calories { get; set; }

        public IEnumerable<CarbohydratesModel> Carbohydrates { get; set; }

        public IEnumerable<VitaminsModel> Vitamins { get; set; }

        public IEnumerable<SterolsModel> Sterols{ get; set; }

        public IEnumerable<MoresModel> Mores { get; set; }

        public IEnumerable<MineralsModel> Minerals { get; set; }

        public IEnumerable<FatsModel> Fats{ get; set; }
    }
}
