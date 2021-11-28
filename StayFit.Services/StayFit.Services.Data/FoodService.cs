using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using StayFit.Data;
using StayFit.Data.Models.FoodModels;
using StayFit.Data.Models.FoodModels.Nutrients;
using StayFit.Services.Helpers;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.Food;
using StayFit.Shared.Nutritions.Food.PostModels;
using StayFit.Shared.Nutritions.Food.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task<LoadFoodCategoriesResponse> LoadFoodCategories()
        {
            var categories = await this.dbContext
                .FoodCategories
                .ProjectTo<FoodCategoryModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return new LoadFoodCategoriesResponse
            {
                FoodCategories = categories,
            };
        }

        public async Task<LoadCategoryFoodsResponse> LoadFoodByCategory(int id)
        {
            var foods = await this.dbContext.Foods
                .Where(x => x.FoodCategoryId == id)
                .ProjectTo<CategoryFoodModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return new LoadCategoryFoodsResponse
            {
                CategoryFoods = foods,
            };
        }

        public async Task<LoadFoodResponse> GetSingleFood(int categoryId, int foodId)
        {
            var food = await this.dbContext.Foods
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
                .FirstOrDefaultAsync();

            return new LoadFoodResponse
            {
                Food = food
            };
        }

        public async Task<LoadNutrientsResponse> LoadNutrients()
        {
            var nutrients = await this.dbContext.BaseNutrients
                .Select(nutrient => new NutrientModel
                {
                    BaseNutrientName = nutrient.Name.ToString(),
                    SubNutrients = nutrient.SubNutrients
                        .Where(foodSn => foodSn.BaseNutrient.Name == nutrient.Name)
                        .Select(foodSn => new SubNutrientModel
                        {
                            Name = foodSn.Name,
                        }).ToList(),
                })
                .ToListAsync();

            return new LoadNutrientsResponse
            {
                Nutrients = nutrients,
            };
        }

        public async Task<AddFoodResponse> CreateNewFood(CreateFoodModel model)
        {
            var food = new Food
            {
                FoodName = await this.dbContext.FoodNames.Where(x => x.Id == model.FoodNameId).FirstOrDefaultAsync(),
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Calories = model.Calories,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                FoodCategory = await this.dbContext.FoodCategories.Where(x => x.Id == model.FoodCategoryId).FirstOrDefaultAsync(),
                IsDeleted = false,
            };
            ICollection<FoodBaseNutrient> baseNutrients = new List<FoodBaseNutrient>();
            foreach (var fnb in model.FoodNutrientModels)
            {
                BaseNutrient baseNutrient = await this.dbContext.BaseNutrients
                    .FirstOrDefaultAsync(x =>  x.Name.Split().Length > 1 ? EnumValueFinder.GetDisplayValue(fnb.BaseNutrientName) == x.Name : x.Name == fnb.BaseNutrientName);
                ICollection<FoodSubNutrient> subNutrients = new List<FoodSubNutrient>();
                foreach (var sn in fnb.SubNutrients)
                {
                    SubNutrient subNutrient = await this.dbContext
                        .SubNutrients
                        .Where(x => x.BaseNutrient.Name == fnb.BaseNutrientName)
                        .FirstOrDefaultAsync(x => x.Name == sn.Name);
                    FoodSubNutrient fsn = new FoodSubNutrient
                    {
                        Food = food,
                        Quantity = sn.Quantity,
                        SubNutrient = subNutrient
                    };
                    subNutrients.Add(fsn);
                }
                await this.dbContext.FoodSubNutrients.AddRangeAsync(subNutrients);

                FoodBaseNutrient fbn = new FoodBaseNutrient
                {
                    Food = food,
                    Quantity = fnb.Quantity,
                    BaseNutrient = baseNutrient
                };
                baseNutrients.Add(fbn);
            }
            await this.dbContext.FoodBaseNutrients.AddRangeAsync(baseNutrients);
            await this.dbContext.Foods.AddAsync(food);
            await this.dbContext.SaveChangesAsync();
            return new AddFoodResponse
            {
                Id = food.Id,
                FoodName = food.FoodName.Name,
            };
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
