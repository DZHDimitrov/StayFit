using StayFit.Data.Models.FoodModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Data.Seeding
{
    public class CategoryFoodTypeSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var categoryFoodTypeLastIds = new int[] { 12, 11, 9, 5, 5, 14, 7, 7, 5, 6, 11, 11, 14, 5, 12 };

            var categoryFoodTypes = new List<CategoryFoodType>();

            if (!dbContext.CategoryFoodTypes.Any())
            {
                var previous = 0;

                for (int i = 0; i < categoryFoodTypeLastIds.Length; i++)
                {
                    if (previous > -1)
                    {
                        for (int j = previous + 1; j <= previous + categoryFoodTypeLastIds[i]; j++)
                        {
                            categoryFoodTypes.Add(new CategoryFoodType { FoodCategoryId = i + 1, FoodTypeId = j });
                        };
                    }
                    else
                    {
                        for (int j = 1; j <= categoryFoodTypeLastIds[i]; j++)
                        {
                            categoryFoodTypes.Add(new CategoryFoodType { FoodCategoryId = i + 1, FoodTypeId = j });
                        }
                    }
                    previous += categoryFoodTypeLastIds[i];
                }

                dbContext.AddRangeAsync(categoryFoodTypes).GetAwaiter().GetResult();
            }
        }
    }
}
