using System;
using System.Collections.Generic;

namespace StayFit.Data.Seeding
{
    public class ApplicationDbContextSeeder
    {
        public static void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (serviceProvider == null)
            {
                throw new ArgumentNullException(nameof(serviceProvider));
            }

            var seeders = new List<ISeeder>
                          {
                              new RolesSeeder(),
                              new ReadingCategoriesSeeder(),
                              new UserSeeder(),
                              new FoodTypesSeeder(),
                              new FoodCategoriesSeeder(),
                              new CategoryFoodTypeSeeder(),
                              new BaseNutrientSeeder(),
                          };

            foreach (var seeder in seeders)
            {
                seeder.Seed(dbContext, serviceProvider);
                dbContext.SaveChanges();
            }
        }
    }
}
