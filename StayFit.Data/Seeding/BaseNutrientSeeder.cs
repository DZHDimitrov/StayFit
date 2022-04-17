using StayFit.Data.Models.FoodModels.Nutrients;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Data.Seeding
{
    public class BaseNutrientSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var baseNutrients = new string[] { "Въглехидрати", "Мазнини", "Витамини", "Минерали", "Аминокиселини", "Стероли", "Още" };

            if (!dbContext.BaseNutrients.Any())
            {
                var bn1 = new BaseNutrient() { Name = "Въглехидрати" };

                bn1.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn1,Name = "Фибри"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Нешесте"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Захари"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Галактоза"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Глюкоза"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Захароза"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Лактоза"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Малтоза"},
                    new SubNutrient() {BaseNutrient = bn1,Name = "Фруктоза"},
                };

                var bn2 = new BaseNutrient() { Name = "Витамини" };

                bn2.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn2,Name = "Бетаин"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин А"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б1(Тиамин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б2(Рибофлавин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б3(Ниацин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б4(Холин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б5(Пантотенова киселина)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б6(Пиридоксин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б9(Фолиева киселна)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Б12(Кобалкамин)"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Ц"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Д"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин Е"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин К1"},
                    new SubNutrient() {BaseNutrient = bn2,Name = "Витамин К2(МК04)"},
                };

                var bn3 = new BaseNutrient() { Name = "Аминокиселини" };

                bn3.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn3,Name = "Аланин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Аргинин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Аспарагинова киселина"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Валин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Глицин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Глутамин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Изолевцин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Левцин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Лезин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Метионин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Пролин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Серин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Тирозин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Треонин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Триптофан"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Фенилалин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Хидроксипролин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Хистидин"},
                    new SubNutrient() {BaseNutrient = bn3,Name = "Цистин"},
                };

                var bn4 = new BaseNutrient() { Name = "Мазнини" };

                bn4.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn4,Name = "Мазнини"},
                    new SubNutrient() {BaseNutrient = bn4,Name = "Мононенаситени мазнини"},
                    new SubNutrient() {BaseNutrient = bn4,Name = "Полиненаситени мазнини"},
                    new SubNutrient() {BaseNutrient = bn4,Name = "Наситени мазнини"},
                    new SubNutrient() {BaseNutrient = bn4,Name = "Трансмазнини"},
                };

                var bn5 = new BaseNutrient() { Name = "Минерали" };

                bn5.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn5,Name = "Желязо"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Калии"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Калции"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Магнезии"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Манган"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Мед"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Натрий"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Селен"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Флуорид"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Фосфор"},
                    new SubNutrient() {BaseNutrient = bn5,Name = "Цинк"},
                };

                var bn6 = new BaseNutrient() { Name = "Стероли" };

                bn6.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn6,Name = "Холестерол"},
                    new SubNutrient() {BaseNutrient = bn6,Name = "Фитостероли"},
                    new SubNutrient() {BaseNutrient = bn6,Name = "Стигмастероли"},
                    new SubNutrient() {BaseNutrient = bn6,Name = "Кампестероли"},
                    new SubNutrient() {BaseNutrient = bn6,Name = "Бета-ситостероли"},
                };

                var bn7 = new BaseNutrient() { Name = "Още" };

                bn7.SubNutrients = new List<SubNutrient>()
                {
                    new SubNutrient() {BaseNutrient = bn7,Name = "Алкохол"},
                    new SubNutrient() {BaseNutrient = bn7,Name = "Вода"},
                    new SubNutrient() {BaseNutrient = bn7,Name = "Кофеин"},
                    new SubNutrient() {BaseNutrient = bn7,Name = "Теобронин"},
                    new SubNutrient() {BaseNutrient = bn7,Name = "Пепел"},
                };

                var bn8 = new BaseNutrient() { Name = "Протеин" };

                var nutrientsToAdd = new List<BaseNutrient>()
                {
                    bn1,bn2,bn3,bn4,bn5,bn6,bn7,bn8
                };

                dbContext.BaseNutrients.AddRangeAsync(nutrientsToAdd).GetAwaiter().GetResult();
            }
        }
    }
}
