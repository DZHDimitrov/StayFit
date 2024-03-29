﻿using StayFit.Data.Models.FoodModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Data.Seeding
{
    internal class FoodTypesSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            //Брандирани продукти, Захарни изделия, печени продукти,продукти за бързо хранене
            string[] types = new string[]
            {
                "Мозък","Черен дроб","Далак","Бъбреци","Бял дроб","Eзик","Черен дроб","Бял дроб","Сърце","Филе","Плешка","Ребра",
                "Анасон","Бахар","Босилек","Ванилия","Горчица","Градински чай","Дафинов лист","Джинджифил","Естрагон","Индийско орехче","Канела",
                "Бакла","Боб","Черен боб","Грах","Леща","Бял боб","Нахут","Соя","Зелен боб",
                "Наденица","Кайма","Флейка","Контра филе","Сланина",//Мозък,Сърце
                "Бизон","Глиган","Еленско","Заек","Дива патица",
                "Алабаш","Амарант","Артишок","Аспержи","Бамбук","Бамя","Боровинки","Броколи","Брюкселско зеле","Водорасли","Гъби","Домати","Зеле","Картофи",//Бакла,Боб
                "Брашно","Булгур","Грис","Елда","Мюсли","Овесени ядки","Ориз",
                "Бекон","Кренвирши","Пастет","Пастарма","Пуешко роле","Салам","Шунка",
                "Айвар","Маслини","Доматено пюре","Кисели краставички","Царевица",//Пастет грах
                "Захтин","Пуешка мазнина","Патешка мазнина","Палмова мазнина","Кокосова мазнина","Масло",
                "Бри","Извара","Кашкавал","Кефир","Кисело мляко","Моцарела","Прясно мляко","Сирене","Пармезан","Котидж","Чедър",
                "Кока кола","Алое вера","Бира","Вино","Водка","Джин","Енергийни напитки","Кафе","Компот","Ликьор","Нектар",
                "Авокадо","Ананас","Банан","Вишни","Грейпфрут","Грозде","Диня","Кайсия","Киви","Лимон","Малина","Мандарина","Портокал","Нар",
                "Гълъб","Гъска","Гъши дроб","Кокошка","Пилешко бутче",
                "Акула","Аншоа","Бяла риба","Змиорка","Калкан","Калмари","Скариди","Миди","Хайвер","Рак","Октопод","Калмар"
            };

            var foodTypes = new List<FoodType>();
            var id = 0;
            foreach (var name in types)
            {
                foodTypes.Add(new FoodType { Id = ++id ,Name = name });
            }

            if (!dbContext.FoodTypes.Any())
            {
                dbContext.FoodTypes.AddRangeAsync(foodTypes).GetAwaiter().GetResult();
            }
        }
    }
}
