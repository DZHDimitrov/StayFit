using AutoMapper;
using AutoMapper.QueryableExtensions;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using StayFit.Data;
using StayFit.Data.Models.FoodModels;
using StayFit.Data.Models.FoodModels.Nutrients;
using StayFit.Services.Common;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Nutritions.Food.Requests;
using StayFit.Shared.Nutritions.Food.Responses;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class FoodService : IFoodService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;
        private readonly Cloudinary cloudinary;

        public FoodService(AppDbContext dbContext, IMapper mapper, Cloudinary cloudinary)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.cloudinary = cloudinary;
        }

        public async Task<IEnumerable<FoodCategoryModel>> LoadFoodCategories()
        {
            var categories = await this.dbContext
                .FoodCategories
                .ProjectTo<FoodCategoryModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            Console.WriteLine();

            return categories;
        }

        public async Task<IEnumerable<FoodPreviewModel>> LoadFoodPreviewsByCategory(string category)
        {
            var foods = await this.dbContext.Foods
                .Where(x => x.FoodCategory.Category.ToLower() == category.ToLower())
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
                    Name = food.FoodType.Name,
                    Calories = food.Calories,
                    Description = food.Description,
                    ImageUrl = food.ImageUrl,
                    Nutrients = food.FoodBaseNutrients
                    .Select(nutrient => new NutrientModel
                    {
                        Id = nutrient.BaseNutrientId,
                        Name = nutrient.BaseNutrient.Name,

                        Quantity = nutrient.Quantity == 0 || nutrient.Quantity == null ?
                        "0.00" :
                        nutrient.Quantity.ToString(),

                        SubNutrients = this.dbContext.SubNutrients
                        .Where(foodSn => foodSn.BaseNutrient.Name == nutrient.BaseNutrient.Name)
                        .Select(sn => new SubNutrientModel
                        {
                            Id = sn.Id,
                            Name = sn.Name,

                            Quantity = this.dbContext.FoodSubNutrients
                            .FirstOrDefault(x => x.FoodId == foodId && x.SubNutrientId == sn.Id).Quantity
                            .ToString() ?? "Няма данни"
                        })
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return food;
        }

        public async Task<FoodCreatedModel> CreateFood(CreateFoodModel model)
        {
            var food = new Food
            {
                FoodTypeId = model.FoodTypeId,
                Description = model.Description,
                //ImageUrl = model.ImageUrl,
                Calories = model.Calories,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                FoodCategoryId = model.FoodCategoryId,
                IsDeleted = false,
            };

            var imageUrl = await ApplicationCloudinary.UploadImage(this.cloudinary, model.Image, "Food");

            food.ImageUrl = imageUrl;

            foreach (var baseNutrient in this.dbContext.BaseNutrients)
            {
                food.FoodBaseNutrients.Add(new FoodBaseNutrient { BaseNutrientId = baseNutrient.Id, FoodId = food.Id });
            }

            await this.dbContext.Foods.AddAsync(food);
            await this.dbContext.SaveChangesAsync();

            return new FoodCreatedModel
            {
                Id = food.Id,
            };
        }

        public async Task<IEnumerable<FoodKeywordModel>> LoadSearchKeywords(string searchedFood)
        {
            searchedFood = searchedFood?.ToLower();

            return await this.dbContext.Foods
                .Where(food => food.FoodType.Name.ToLower().Contains(searchedFood) || searchedFood.Contains(food.FoodType.Name.ToLower()))
                .ProjectTo<FoodKeywordModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FoodTypeModel>> LoadFoodTypesByCategoryId(string categoryId)
        {
            return await this.dbContext.CategoryFoodTypes
                .Where(c => c.FoodCategoryId.ToString() == categoryId)
                .Select(x => new FoodTypeModel
                {
                    Id = x.FoodTypeId,
                    Name = x.FoodType.Name
                })
                .ToListAsync();
        }

        /// <summary>
        /// Splits the input and returns Food previews based on specificity.
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
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
                    .Where(f => f.FoodType.Name.ToLower().Contains(word))
                    .Select(f => f.FoodType.Name)
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
                        f.FoodCategory.Category == existingCategory &&
                        f.FoodType.Name == existingFood &&
                        (f.Description == description || f.Description.Contains(description) || description.Contains(f.Description))
                    )
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else if (existingCategory != null && existingFood != null && description == null)
            {
                return await this.dbContext.Foods.Where(f => f.FoodCategory.Category.ToLower() == existingCategory && f.FoodType.Name == existingFood)
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else if (existingFood != null)
            {
                return await this.dbContext.Foods.Where(f => f.FoodType.Name == existingFood)
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }
            else if (existingCategory != null)
            {
                return await this.dbContext.Foods.Where(f => f.FoodCategory.Category == existingCategory)
                    .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToListAsync();
            }

            return new List<FoodPreviewModel>();
        }

        public async Task<FoodEditedModel> EditFoodById(int foodId, EditFoodModel model)
        {
            var food = await this.dbContext.Foods
                .Include(food => food.FoodBaseNutrients)
                .Include(food => food.FoodSubNutrients)
                .FirstOrDefaultAsync(food => food.Id == foodId);

            food.Calories = model.Calories ?? food.Calories;

            foreach (var baseNutrient in model.Nutrients)
            {
                var foodBaseNutrient = food.FoodBaseNutrients.FirstOrDefault(fbn => fbn.BaseNutrientId == baseNutrient.Id);
                double quantity = 0;

                if (double.TryParse(baseNutrient.Quantity, NumberStyles.Number, CultureInfo.InvariantCulture, out quantity))
                {
                    foodBaseNutrient.Quantity = double.Parse(quantity.ToString("f2"));
                }
            }

            foreach (var subNutrient in model.SubNutrients)
            {
                var foodSubNutrient = food.FoodSubNutrients.FirstOrDefault(fsn => fsn.SubNutrientId == subNutrient.Id);
                double quantity = 0;

                if (double.TryParse(subNutrient.Quantity, NumberStyles.Number, CultureInfo.InvariantCulture, out quantity))
                {
                    if (foodSubNutrient == null)
                    {
                        foodSubNutrient = new FoodSubNutrient { FoodId = food.Id, SubNutrientId = subNutrient.Id, Quantity = quantity };
                        this.dbContext.FoodSubNutrients.Add(foodSubNutrient);
                    }
                    else
                    {
                        foodSubNutrient.Quantity = double.Parse($"{quantity:f2}");
                    }
                }

            }

            await this.dbContext.SaveChangesAsync();

            var updatedFood = await this.dbContext.Foods.Where(f => f.Id == foodId).Select(x => new FoodModel
            {
                Id = x.Id,
                Calories = x.Calories,
                Description = x.Description,
                Name = x.FoodType.Name,
                ImageUrl = x.ImageUrl,
                Nutrients = x.FoodBaseNutrients
                    .Select(nutrient => new NutrientModel
                    {
                        Id = nutrient.BaseNutrientId,
                        Name = nutrient.BaseNutrient.Name,

                        Quantity = nutrient.Quantity == 0 || nutrient.Quantity == null ?
                        "0.00" :
                        nutrient.Quantity.ToString(),

                        SubNutrients = this.dbContext.SubNutrients
                        .Where(foodSn => foodSn.BaseNutrient.Name == nutrient.BaseNutrient.Name)
                        .Select(sn => new SubNutrientModel
                        {
                            Id = sn.Id,
                            Name = sn.Name,

                            Quantity = this.dbContext.FoodSubNutrients
                            .FirstOrDefault(x => x.FoodId == foodId && x.SubNutrientId == sn.Id).Quantity
                            .ToString() ?? "Няма данни"
                        })
                    }).ToList()
            }).FirstOrDefaultAsync();

            return new FoodEditedModel { Id = foodId, Food = updatedFood };
        }
    }
}
