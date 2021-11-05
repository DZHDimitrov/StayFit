using AutoMapper;
using AutoMapper.QueryableExtensions;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.FoodModels;
using StayFit.Data.Models.FoodModels.Nutrients;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.NutrientModels.RedoFoods;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Services.StayFit.Services.Data
{
    public class FoodService : IFoodService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public FoodService(AppDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public IEnumerable<FoodCategoryModel> GetFoodCategories()
        {
            return this.dbContext.FoodCategories.ProjectTo<FoodCategoryModel>(this.mapper.ConfigurationProvider).ToList();
        }

        public IEnumerable<SingleFoodCategoryModel> GetAllFoodByCategory(int id)
        {
            return this.dbContext.Foods
                .Where(x => x.FoodCategoryId == id)
                .Select(food => new SingleFoodCategoryModel { Id = food.Id, Name = food.FoodName.Name, Description = food.Description }).ToList();
        }

        public FoodModel GetSingleFood(int categoryId, int foodId)
        {
            return this.dbContext.Foods
                .Where(food => food.Id == foodId)
                .Select(food => new FoodModel
                {
                    Id = food.Id,
                    Name = food.FoodName.Name,
                    Calories = food.Calories,
                    NutrientModels = food.FoodBaseNutrients
                    .Select(nutrient => new NutrientModel
                    {
                        BaseNutrientName = nutrient.BaseNutrient.Name,
                        Quantity = nutrient.Quantity,
                        SubNutrients = nutrient.Food.FoodSubNutrients
                        .Where(foodSn => foodSn.SubNutrient.BaseNutrient.Name == nutrient.BaseNutrient.Name)
                        .Select(foodSn => new SubNutrientModel
                        {
                            Name = foodSn.SubNutrient.Name,
                            Quantity = foodSn.Quantity
                        }).ToList(),
                    }).ToList()
                })
                .FirstOrDefault();
        }

        public IEnumerable<NutrientModel> GetNutrients()
        {
            return this.dbContext.FoodBaseNutrients
                .Select(nutrient => new NutrientModel
                {
                    BaseNutrientName = nutrient.BaseNutrient.Name,
                    SubNutrients = nutrient.Food.FoodSubNutrients
                        .Where(foodSn => foodSn.SubNutrient.BaseNutrient.Name == nutrient.BaseNutrient.Name)
                        .Select(foodSn => new SubNutrientModel
                        {
                            Name = foodSn.SubNutrient.Name,
                        }).ToList(),
                }).ToList();
        }

        public void CreateNewFood(CreateFoodModel model)
        {
            var food = new Food
            {
                FoodName = this.dbContext.FoodNames.Where(x => x.Id == model.FoodNameId).FirstOrDefault(),
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Calories = model.Calories,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                FoodCategory = this.dbContext.FoodCategories.Where(x => x.Id == model.FoodCategoryId).FirstOrDefault(),
                IsDeleted = false,
            };

            foreach (var fnb in model.FoodNutrientModels)
            {
                BaseNutrient baseNutrient = this.dbContext.BaseNutrients
                    .FirstOrDefault(x => x.Name == fnb.BaseNutrientName);
                foreach (var sn in fnb.SubNutrients)
                {
                    SubNutrient subNutrient = this.dbContext.SubNutrients
                        .Where(x => x.BaseNutrient.Name == fnb.BaseNutrientName)
                        .FirstOrDefault(x => x.Name == sn.Name);
                    FoodSubNutrient fsn = new FoodSubNutrient { Food = food, Quantity = sn.Quantity, SubNutrient = subNutrient };
                    this.dbContext.FoodSubNutrients.Add(fsn);
                }
                FoodBaseNutrient fbn = new FoodBaseNutrient { Food = food, Quantity = fnb.Quantity, BaseNutrient = baseNutrient };
                this.dbContext.FoodBaseNutrients.Add(fbn);
            }
            this.dbContext.SaveChanges();
        }

        //public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId)
        //{
        //    return this.dbContext.TypeCategories
        //        .Where(x => x.CategoryId == categoryId)
        //        .Select(x =>
        //            new SingleFoodTypeModel
        //            {
        //                Id = x.FoodTypeId,
        //                Name = x.FoodType.Name
        //            })
        //        .ToList();
        //}
    }
}
