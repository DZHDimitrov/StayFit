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

        public async Task<IEnumerable<FoodCategoryPreviewModel>> LoadFoodCategories()
        {
            var categories = await this.dbContext
                .FoodCategories
                .ProjectTo<FoodCategoryPreviewModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return categories;
        }

        public async Task<IEnumerable<FoodPreviewModel>> LoadFoodByCategory(string categoryName)
        {
            categoryName = categoryName.ToLower();

            var foods = await this.dbContext.Foods
                .Where(x => x.FoodCategory.Category.ToLower() == categoryName)
                .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return foods;
        }

        public async Task<FoodModel> LoadFoodById(int foodId)
        {
            var food = await this.dbContext.Foods
                .Where(food => food.Id == foodId)
                .Select(food => new FoodModel
                {
                    Id = food.Id,
                    Name = food.FoodName.Name,
                    Calories = food.Calories,
                    Description = food.Description,
                    ImageUrl = food.ImageUrl,
                    Nutrients = food.FoodBaseNutrients
                    .Select(nutrient => new NutrientModel
                    {
                        Name = nutrient.BaseNutrient.Name,
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

            return food;
        }

        public async Task<IEnumerable<NutrientModel>> LoadNutrients()
        {
            var nutrients = await this.dbContext.BaseNutrients
                .Select(nutrient => new NutrientModel
                {
                    Name = nutrient.Name.ToString(),
                    SubNutrients = nutrient.SubNutrients
                        .Where(foodSn => foodSn.BaseNutrient.Name == nutrient.Name)
                        .Select(foodSn => new SubNutrientModel
                        {
                            Name = foodSn.Name,
                        })
                        .ToList(),
                })
                .ToListAsync();

            return nutrients;
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
                    .FirstOrDefaultAsync(bn => bn.Name.Split().Length > 1 ?
                    EnumValueFinder.GetDisplayValue(fnb.Name) == bn.Name 
                    : bn.Name == fnb.Name);

                ICollection<FoodSubNutrient> subNutrients = new List<FoodSubNutrient>();
                foreach (var sn in fnb.SubNutrients)
                {
                    SubNutrient subNutrient = await this.dbContext
                        .SubNutrients
                        .Where(sn => sn.BaseNutrient.Name == fnb.Name)
                        .FirstOrDefaultAsync(sn => sn.Name == sn.Name);

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

        public async Task<IEnumerable<FoodKeywordModel>> LoadFoodKeywords(string searchedFood)
        {
            searchedFood = searchedFood?.ToLower();

            return await this.dbContext.Foods
                .Where(food => food.FoodName.Name.ToLower().Contains(searchedFood) || searchedFood.Contains(food.FoodName.Name.ToLower()))
                .ProjectTo<FoodKeywordModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FoodPreviewModel>> Search(string text)
        {
            var words = text.Split(new char[] { ',', '-', ':', ' ', ';', '_' }).Where(x => x != "").ToArray();

            string existingCategory = null;
            string existingFood = null;
            string description = null;


            foreach (var word in words)
            {
                existingCategory = await this.dbContext.FoodCategories
                    .Where(c => c.Category.ToLower().Contains(word))
                    .Select(c => c.Category)
                    .FirstOrDefaultAsync();

                if (existingCategory != null)
                {
                    break;
                }
            }

            foreach (var word in words)
            {

                existingFood = await this.dbContext.Foods
                    .Where(f => f.FoodName.Name.ToLower() == word)
                    .Select(f => f.FoodName.Name)
                    .FirstOrDefaultAsync();

                if (existingFood != null)
                {
                    break;
                }
            }

            foreach (var word in words)
            {
                description = await this.dbContext.Foods
                    .Where(food => food.Description.Contains(word))
                    .Select(x => x.Description)
                    .FirstOrDefaultAsync();

                if (description != null)
                {
                    break;
                }
            }

            if (existingCategory != null && existingFood != null && description != null)
            {
                return await this.dbContext.Foods
                    .Where
                    (
                        f =>
                        f.FoodCategory.Category.ToLower() == existingCategory &&
                        f.FoodName.Name == existingFood &&
                        f.Description == description
                    )
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else if (existingCategory != null && existingFood != null && description == null)
            {
                return await this.dbContext.Foods.Where(f => f.FoodCategory.Category.ToLower() == existingCategory && f.FoodName.Name == existingFood)
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else if (existingFood != null)
            {
                return await this.dbContext.Foods.Where(f => f.FoodName.Name == existingFood)
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            return new List<FoodPreviewModel>();
        }
    }
}
