using StayFit.Data.Models.ReadingModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Data.Seeding
{
    internal class ReadingCategoriesSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var mainCategory1 = new ReadingMainCategory()
            {
                Name = "Хранене",
            };

            mainCategory1.ReadingSubCategories = new List<ReadingSubCategory>
            {
                new ReadingSubCategory()
                {
                    Name = "Хранителни режими",
                    ReadingMainCategory = mainCategory1,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-diets.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Хранителен състав на храни и продукти",
                    ReadingMainCategory = mainCategory1,
                    ImageUrl = "https://bbteamcdn.com/img/site/foods-db/default-foods2.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Рецепти",
                    ReadingMainCategory = mainCategory1,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-recipes.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Статии за хранене",
                    ReadingMainCategory = mainCategory1,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-articles.jpg",
                },
            };


            var mainCategory2 = new ReadingMainCategory()
            {
                Name = "Тренировки",
            };

            mainCategory2.ReadingSubCategories = new List<ReadingSubCategory>
            {
                new ReadingSubCategory()
                {
                    Name = "Тренировъчни програми",
                    ReadingMainCategory = mainCategory2,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-diets.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Упражнения",
                    ReadingMainCategory = mainCategory2,
                    ImageUrl = "https://bbteamcdn.com/img/site/foods-db/default-foods2.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Тренировъчни комплекси",
                    ReadingMainCategory = mainCategory2,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-recipes.jpg",
                },

                new ReadingSubCategory()
                {
                    Name = "Статии за тренировки",
                    ReadingMainCategory = mainCategory2,
                    ImageUrl = "https://bbteamcdn.com/img/site/nutrition/nutrition-articles.jpg",
                },
            };

            var mainCategory3 = new ReadingMainCategory()
            {
                Name = "Статии",
            };

            var mainCategory4 = new ReadingMainCategory()
            {
                Name = "Ръководство",
            };

            var categories = new List<ReadingMainCategory>()
            {
                mainCategory1,
                mainCategory2,
                mainCategory3,
                mainCategory4
            };

            if (!dbContext.ReadingMainCategories.Any())
            {
                foreach (var mc in categories)
                {
                    dbContext.ReadingMainCategories.Add(mc);
                    dbContext.SaveChanges();
                }
            }
        }
    }
}
