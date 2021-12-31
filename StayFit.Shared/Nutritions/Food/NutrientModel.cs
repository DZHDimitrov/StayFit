﻿namespace StayFit.Shared.Nutritions.Food
{
    using System.Collections.Generic;

    public class NutrientModel
    {
        public string Name { get; set; }

        public double? Quantity { get; set; }

        public IEnumerable<SubNutrientModel> SubNutrients { get; set; }
    }
}
