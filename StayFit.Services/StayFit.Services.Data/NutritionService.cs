using AutoMapper;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class NutritionService : INutritionService
    {
        private readonly AppDbContext dbContext;

        public NutritionService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<FoodCategoryModel> GetFoodCategories()
        {
            return this.dbContext.FoodCategories
                .Select(x => new FoodCategoryModel
                {
                    Id = x.Id,
                    Name = x.Category,
                    ImageUrl = x.ImageUrl
                }).ToList();
        }

        public IEnumerable<SingleCategoryFoodModel> GetAllFoodByCategory(int id)
        {
            return this.dbContext.Foods
                .Where(x => x.FoodCategoryId == id)
                .Select(x => new SingleCategoryFoodModel
                {
                    Id = x.Id,
                    Name = x.Description,
                    Description = null,
                    ImageUrl = x.ImageUrl
                });
        }

        public void CreateNewFood(CreateNewFoodModel model)
        {
            var food = new Food()
            {
                Description = model.Description,
                Calories = model.Calories,
                CreatedOn = DateTime.UtcNow,
                FoodCategoryId = model.FoodCategoryId,
                FoodTypeId = model.FoodTypeId,
                ImageUrl = model.ImageUrl,
                IsDeleted = false,
            };
            this.dbContext.Foods.Add(food);
            this.dbContext.SaveChanges();

            food.FoodVitamins = model.Vitamins
                .Select(x => new FoodVitamins
                {
                    FoodId = food.Id,
                    VitaminTypeId = this.dbContext.VitaminTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                    Quantity = x.Quantity
                })
                .ToList();

            food.FoodAminoAcids = model.Aminoacids
                .Select(x => new FoodAminoAcids
                {
                    FoodId = food.Id,
                    AminoAcidsTypeId = this.dbContext.AminoAcidsTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                    Quantity = x.Quantity
                })
                .ToList();

            food.FoodCarbohydrates = model.Carbohydrates
                .Select(x => new FoodCarbohydrates
                {
                    FoodId = food.Id,
                    CarbohydrateTypeId = this.dbContext.CarbohydrateTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                    Quantity = x.Quantity
                })
                .ToList();

            food.FoodMinerals = model.Minerals
                .Select(x => new FoodMinerals
                {
                    FoodId = food.Id,
                    MineralTypeId = this.dbContext.MineralTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                    Quantity = x.Quantity
                })
                .ToList();

            food.FoodSterols = model.Sterols
                .Select(x => new FoodSterols
                {
                    FoodId = food.Id,
                    SterolTypeId = this.dbContext.SterolTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                    Quantity = x.Quantity
                })
                .ToList();

            food.FoodFats = model.Fats.Select(x => new FoodFats
            {
                FoodId = food.Id,
                FatTypeId = this.dbContext.FatTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                Quantity = x.Quantity
            })
                .ToList();

            food.FoodMores = model.Mores.Select(x => new FoodMores
            {
                FoodId = food.Id,
                MoreTypeId = this.dbContext.MoreTypes.FirstOrDefault(y => y.Name == x.Name).Id,
                Quantity = x.Quantity
            })
                .ToList();

            this.dbContext.SaveChanges();
        }

        public SingleFoodModel GetSingleFood(int categoryId, int foodId)
        {
            return this.dbContext.Foods
                .Where(x => x.FoodCategoryId == categoryId && x.Id == foodId)
                .Select(x => new SingleFoodModel
                {
                    Id = x.Id,
                    Calories = x.Calories,
                    Name = x.FoodType.Name,
                    Carbohydrates = this.dbContext.FoodCarbohydrates
                                    .Where(y => y.FoodId == foodId)
                                    .Select(y =>
                                        new CarbohydratesModel
                                        {
                                            Id = y.CarbohydrateType.Id,
                                            Quantity = y.Quantity,
                                        }
                                        ).ToList(),
                    Fats = this.dbContext.FoodFats
                                .Where(y => y.FoodId == foodId)
                                .Select(y =>
                                    new FatsModel
                                    {
                                        Id = y.FatType.Id,
                                        Quantity = y.Quantity
                                    }).ToList(),
                    Minerals = this.dbContext.FoodMinerals
                                    .Where(y => y.FoodId == foodId)
                                    .Select(y =>
                                     new MineralsModel
                                     {
                                         Id = y.MineralType.Id,
                                         Quantity = y.Quantity,
                                     }).ToList(),
                    Vitamins = this.dbContext.FoodVitamins
                                    .Where(y => y.FoodId == foodId)
                                    .Select(y =>
                                     new VitaminsModel
                                     {
                                         Id = y.VitaminType.Id,
                                         Quantity = y.Quantity,
                                     }).ToList(),
                    Sterols = this.dbContext.FoodSterols
                                    .Where(y => y.FoodId == foodId)
                                    .Select(y =>
                                     new SterolsModel
                                     {
                                         Id = y.SterolType.Id,
                                         Quantity = y.Quantity,
                                     }).ToList(),
                    Mores = this.dbContext.FoodMores
                                  .Where(y => y.FoodId == foodId)
                                  .Select(y =>
                                  new MoresModel
                                  {
                                      Id = y.MoreType.Id,
                                      Quantity = y.Quantity
                                  }).ToList()
                }).FirstOrDefault();
        }

        public IEnumerable<SingleFoodTypeModel> GetFoodTypesByCategory(int categoryId)
        {
            return this.dbContext.TypeCategories
                .Where(x => x.CategoryId == categoryId)
                .Select(x =>
                    new SingleFoodTypeModel
                    {
                        Id = x.FoodTypeId,
                        Name = x.FoodType.Name
                    })
                .ToList();
        }

        public IEnumerable<NutrientModel> GetNutrients()
        {
            var carbohydrates = new NutrientModel { Name = "Carbohydrates", NutrientTypes = this.dbContext.CarbohydrateTypes.Select(x => x.Name).ToList() };

            var aminoAcids = new NutrientModel { Name = "Aminoacids", NutrientTypes = this.dbContext.AminoAcidsTypes.Select(x => x.Name).ToList() };

            var fats = new NutrientModel { Name = "Fats", NutrientTypes = this.dbContext.FatTypes.Select(x => x.Name).ToList() };

            var minerals = new NutrientModel { Name = "Minerals", NutrientTypes = this.dbContext.MineralTypes.Select(x => x.Name).ToList() };

            var sterols = new NutrientModel { Name = "Sterols", NutrientTypes = this.dbContext.SterolTypes.Select(x => x.Name).ToList() };

            var vitamins = new NutrientModel { Name = "Vitamins", NutrientTypes = this.dbContext.VitaminTypes.Select(x => x.Name).ToList() };

            var mores = new NutrientModel { Name = "More", NutrientTypes = this.dbContext.MoreTypes.Select(x => x.Name).ToList() };

            return new List<NutrientModel>()
            {
                carbohydrates,aminoAcids,fats,minerals,sterols,vitamins,mores
            };
        }
    }
}
