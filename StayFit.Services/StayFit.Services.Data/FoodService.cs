using AutoMapper;
using AutoMapper.QueryableExtensions;

using CloudinaryDotNet;

using Microsoft.EntityFrameworkCore;

using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.FoodModels;
using StayFit.Data.Models.FoodModels.Nutrients;
using StayFit.Infrastructure;
using StayFit.Services.Common;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared.Nutritions.Food.Requests;
using StayFit.Shared.Nutritions.Food;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using StayFit.Shared.Nutritions;

namespace StayFit.Services.StayFit.Services.Data
{
    public class FoodService : IFoodService
    {
        private readonly IRepository<FoodCategory> categoryRepo;
        private readonly IRepository<BaseNutrient> baseNutrientRepo;
        private readonly IRepository<SubNutrient> subNutrientRepo;
        private readonly IRepository<FoodSubNutrient> foodSubNutrientRepo;
        private readonly IDeletableEntityRepository<Food> foodRepo;
        private readonly IRepository<CategoryFoodType> categoryFoodTypeRepo;
        private readonly IRepository<FoodCategory> foodCategoryRepo;
        private readonly IMapper mapper;
        private readonly Cloudinary cloudinary;

        public FoodService(
            IRepository<FoodCategory> _categoryRepo,
            IRepository<BaseNutrient> _baseNutrientRepo,
            IRepository<FoodSubNutrient> _foodSubNutrientRepo,
            IDeletableEntityRepository<Food> _foodRepo,
            IRepository<CategoryFoodType> _categoryFoodTypeRepo,
            IRepository<FoodCategory> _foodCategoryRepo,
            IRepository<SubNutrient> _subNutrientRepo,
            IMapper mapper,
            Cloudinary cloudinary)
        {
            categoryRepo = _categoryRepo;
            baseNutrientRepo = _baseNutrientRepo;
            foodSubNutrientRepo = _foodSubNutrientRepo;
            foodRepo = _foodRepo;
            categoryFoodTypeRepo = _categoryFoodTypeRepo;
            foodCategoryRepo = _foodCategoryRepo;
            subNutrientRepo = _subNutrientRepo;
            this.mapper = mapper;
            this.cloudinary = cloudinary;
        }

        //checked
        public async Task<IEnumerable<FoodCategoryModel>> LoadFoodCategories()
        {
            var categories = await categoryRepo
                .All()
                .ProjectTo<FoodCategoryModel>(mapper.ConfigurationProvider)
                .ToListAsync();

            return categories;
        }

        //checked
        public async Task<string> CreateFood(CreateFoodModel model)
        {
            var food = new Food
            {
                FoodTypeId = model.FoodTypeId,
                Description = model.Description,
                Calories = model.Calories,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                FoodCategoryId = model.FoodCategoryId,
                IsDeleted = false,
            };

            var imageUrl = await ApplicationCloudinary.UploadImage(cloudinary, model.Image, "Food");

            food.ImageUrl = imageUrl;

            foreach (var baseNutrient in await baseNutrientRepo.All().ToListAsync())
            {
                food.FoodBaseNutrients.Add(new FoodBaseNutrient { BaseNutrientId = baseNutrient.Id, FoodId = food.Id });
            }

            await foodRepo.AddAsync(food);
            await foodRepo.SaveChangesAsync();

            return food.Id.ToString();
        }

        //checked
        public async Task<FoodEditedModel> EditFoodById(int foodId, EditFoodModel model)
        {
            var food = await foodRepo
                .All()
                .Include(food => food.FoodBaseNutrients)
                .Include(food => food.FoodSubNutrients)
                .FirstOrDefaultAsync(food => food.Id == foodId);

            Guards.AgainstNull(food, "Храната");

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
                        await foodSubNutrientRepo.AddAsync(foodSubNutrient);
                    }
                    else
                    {
                        foodSubNutrient.Quantity = double.Parse($"{quantity:f2}");
                    }
                }

            }

            await foodSubNutrientRepo.SaveChangesAsync();

            var updatedFood = await LoadFoodById(food.Id);

            return new FoodEditedModel { Id = foodId, Food = updatedFood };
        }

        //checked
        public async Task<string> DeleteFoodById(int foodId)
        {
            var food = await foodRepo
                .All()
                .Where(food => food.Id == foodId)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(food, "Храната");

            foodRepo.Delete(food);
            await foodRepo.SaveChangesAsync();

            return food.Id.ToString();
        }

        //checked
        public async Task<IEnumerable<FoodTypeModel>> LoadFoodTypesByCategoryId(string categoryId)
        {
            return await categoryFoodTypeRepo
                .All()
                .Where(c => c.FoodCategoryId.ToString() == categoryId)
                .Select(x => new FoodTypeModel
                {
                    Id = x.FoodTypeId,
                    Name = x.FoodType.Name
                })
                .ToListAsync();
        }

        //checked
        public async Task<IEnumerable<FoodPreviewModel>> LoadFoodPreviewsByCategory(string category)
        {
            var foods = await foodRepo
                .All()
                .Where(x => x.FoodCategory.Category.ToLower() == category.ToLower())
                .ProjectTo<FoodPreviewModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return foods;
        }

        //checked
        public async Task<FoodModel> LoadFoodById(int foodId)
        {
            var food = await foodRepo
                .All()
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

                        SubNutrients = subNutrientRepo
                        .All()
                        .Where(foodSn => foodSn.BaseNutrient.Name == nutrient.BaseNutrient.Name)
                        .Select(sn => new SubNutrientModel
                        {
                            Id = sn.Id,
                            Name = sn.Name,

                            Quantity = foodSubNutrientRepo
                            .All()
                            .FirstOrDefault(x => x.FoodId == foodId && x.SubNutrientId == sn.Id).Quantity
                            .ToString() ?? "Няма данни"
                        })
                    })
                    .OrderBy(nutrient => nutrient.Name)
                    .ToList()
                })
                .FirstOrDefaultAsync();

            Guards.AgainstNull(food, "Храната");

            return food;
        }

        //checked
        public async Task<IEnumerable<FoodPreviewModel>> Search(string text)
        {
            text = text.ToLower();
            var words = text.Split(new char[] { ',', '-', ':', ' ', ';', '_' }).Where(x => x != "").ToArray();

            string existingCategory = null;

            foreach (var word in words)
            {
                existingCategory = await foodCategoryRepo
                    .All()
                    .Where(c => c.Category.ToLower().Contains(word))
                    .Select(c => c.Category.ToLower())
                    .FirstOrDefaultAsync();

                if (existingCategory != null)
                {
                    return await foodRepo
                    .All()
                    .Where(food => food.FoodCategory.Category.ToLower() == existingCategory)
                    .Where(food => food.FoodType.Name.ToLower().Contains(text) || text.Contains(food.FoodType.Name))
                    .ProjectTo<FoodPreviewModel>(mapper.ConfigurationProvider)
                    .ToListAsync();
                }
            }

            return await foodRepo
            .All()
            .Where(food => food.FoodType.Name.ToLower().Contains(text) || text.Contains(food.FoodType.Name))
            .ProjectTo<FoodPreviewModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        }
    }
}
