using StayFit.Data.Models.FoodModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Data.Seeding
{
    public class FoodCategoriesSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var categoryNames = new Dictionary<string,string>()
            {
                ["Агнешки продукти"] = "https://bbteamcdn.com/img/food/icons/agneshki-produkti.png",
                ["Билки и подправки"] = "https://bbteamcdn.com/img/food/icons/bilki-i-podpravki.png",
                ["Бобови култури"] = "https://bbteamcdn.com/img/food/icons/bobovi-kulturi.png",
                ["Говежди продукти"] = "https://bbteamcdn.com/img/food/icons/govezhdi-produkti.png",
                ["Дивеч"] = "https://bbteamcdn.com/img/food/icons/divech.png",
                ["Зеленчуци"] = "https://bbteamcdn.com/img/food/icons/zelenchutsi.png",
                ["Зърнени култури"] = "https://bbteamcdn.com/img/food/icons/zarneni-kulturi.png",
                ["Колбаси"] = "https://bbteamcdn.com/img/food/icons/kolbasi.png",
                ["Консервирани храни"] = "https://bbteamcdn.com/img/food/icons/konservirani-hrani.png",
                ["Масла и олия"] = "https://bbteamcdn.com/img/food/icons/masla-i-oliya.png",
                ["Млечни и яйчни продукти"] = "https://bbteamcdn.com/img/food/icons/mlechni-i-yaychni-produkti.png",
                ["Напитки"] = "https://bbteamcdn.com/img/food/icons/napitki.png",
                ["Плодове"] = "https://bbteamcdn.com/img/food/icons/plodove.png",
                ["Птичи продукти"] = "https://bbteamcdn.com/img/food/icons/ptichi-produkti.png",
                ["Рибни продукти"] = "https://bbteamcdn.com/img/food/icons/ribni-produkti.png",
            };

            var categories = new List<FoodCategory>();
            var id = 0;
            if (!dbContext.FoodCategories.Any())
            {
                foreach (var (key,value) in categoryNames)
                {
                    categories.Add(new FoodCategory { Id = ++id,Category = key,ImageUrl = value });
                }

                dbContext.AddRangeAsync(categories).GetAwaiter().GetResult();
            }
        }
    }
}
