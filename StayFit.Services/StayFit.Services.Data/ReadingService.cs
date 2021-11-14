using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NickBuhro.Translit;
using StayFit.Common;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.ReadingModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ReadingService : IReadingService
    {
        private readonly AppDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;

        public ReadingService(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        public void DeleteArticle()
        {
            throw new NotImplementedException();
        }

        public void EditArticle()
        {
            throw new NotImplementedException();
        }

        public async Task<ReadingResponse> LoadReadingsByMainCategory(string readingCategory)
        {
            var readings = await this.dbContext.Readings
                .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .Select(reading => new ReadingModel
                {
                    Id = reading.Id,
                    Content = reading.Content,
                    ImageUrl = reading.ImageUrl,
                    Title = reading.Title
                })
                .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        public async Task<ReadingResponse> LoadReadingsBySubCategory(string mainCategory, string subCategory)
        {
            var readings = await this.dbContext.Readings
                .Where(reading => reading.ReadingSubCategory.SearchName.ToLower() == subCategory.ToLower() && mainCategory.ToLower() == reading.ReadingMainCategory.SearchName.ToLower())
                .Select(reading => new ReadingModel
                {
                    Id = reading.Id,
                    Content = reading.Content,
                    ImageUrl = reading.ImageUrl,
                    Title = reading.Title
                })
                .ToListAsync();
            return new ReadingResponse
            {
                Readings = readings
            };
        }

        public async Task<ReadingResponse> LoadLatestReadings(string readingCategory)
        {
            var readings = await this.dbContext.Readings
                 .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                 .OrderByDescending(reading => reading.CreatedOn)
                 .Take(4)
                 .Select(reading => new ReadingModel
                 {
                     Id = reading.Id,
                     Content = reading.Content,
                     ImageUrl = reading.ImageUrl,
                     Title = reading.Title
                 })
                 .ToListAsync();
            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        public async Task<ReadingSubCategoryResponse> LoadLatestSubCategories(string readingCategory)
        {
            var subCategories = await this.dbContext.ReadingSubCategories
                .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .OrderByDescending(subCategory => subCategory.CreatedOn)
                .Select(subCategory => new ReadingSubCategoryModel
                {
                    Name = subCategory.Name,
                    ImageUrl = subCategory.ImageUrl
                })
                .Take(4)
                .ToListAsync();

            return new ReadingSubCategoryResponse
            {
                ReadingsSubCategories = subCategories
            };
        }

        public async Task<ReadingSubCategoryResponse> LoadSubCategoriesByMainCategory(string readingCategory)
        {
            var readingSubCategories = await this.dbContext.ReadingSubCategories
                .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .Select(subCategory => new ReadingSubCategoryModel
                {
                    Name = subCategory.Name,
                    ImageUrl = subCategory.ImageUrl
                })
                .ToListAsync();
            return new ReadingSubCategoryResponse
            {
                ReadingsSubCategories = readingSubCategories
            };
        }

        public async Task<ReadingResponse> LoadReadingBySearchName(string subCategory, string readingSearchName)
        {
            IEnumerable<ReadingModel> reading = null;

            reading = await this.dbContext.Readings
                .Where(reading => reading.SearchTitle.ToLower() == readingSearchName.ToLower() && reading.ReadingSubCategory.SearchName.ToLower() == subCategory.ToLower())
                .Select(reading => new ReadingModel
                {
                    Id = reading.Id,
                    Title = reading.Title,
                    Content = reading.Content,
                    ImageUrl = reading.ImageUrl
                })
                .Take(1)
                .ToListAsync();

            if (reading.Count() == 0)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, readingSearchName));
            }

            return new ReadingResponse
            {
                Readings = reading,
            };
        }

        public async Task<ReadingResponse> LoadExerciseByBodyPart(string bodyPart)
        {
            var readings = await this.dbContext.Readings
                .Where(x => x.BodyPart != null && x.BodyPart.SearchName.ToLower() == bodyPart.ToLower())
                .Select(x => new ReadingModel
                {
                    Id = x.Id,
                    Content = x.Content,
                    ImageUrl = x.ImageUrl,
                    Title = x.Title
                })
                .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        public async Task<AddReadingResponse> CreateReading(AddReadingRequest model)
        {
            var mainCategory = await this.dbContext.ReadingMainCategories.FirstOrDefaultAsync(x => x.Id == model.MainGroupId);
            if (mainCategory.Name != "Статии" && mainCategory.Name != "Ръководство" && model.SubGroup == null)
            {
                throw new ArgumentException($"{mainCategory.SearchName} must have subgroups!");
            }
            var reading = new Reading()
            {
                Title = model.Title,
                Content = model.Content,
                ImageUrl = model.ImageUrl,
                IsDeleted = false,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                ReadingMainCategory = mainCategory,
            };

            reading.SearchTitle = TransformNameToCyrillic(model.Title);

            if (model.SubGroup != null)
            {
                var subCategory = await this.dbContext.ReadingSubCategories.FirstOrDefaultAsync(x => x.Id == model.SubGroup.Id);
                reading.ReadingSubCategory = subCategory;
                if (subCategory.SearchName == "Exercises")
                {
                    var bodyPart = await this.dbContext.BodyParts.FirstOrDefaultAsync(x => x.Id == model.SubGroup.bodyPartId);
                    reading.BodyPart = bodyPart;
                }
            }
            await this.dbContext.Readings.AddAsync(reading);
            await this.dbContext.SaveChangesAsync();
            return new AddReadingResponse
            {
                Id = reading.Id,
                Title = reading.Title,
            };
        }

        public string TransformNameToCyrillic(string input)
        {
            return this.dbContext.Readings
                .OrderByDescending(x => x.Id)
                .FirstOrDefault().Id + 1 + "_" + String.Join("_", Transliteration.CyrillicToLatin(input).ToLower().Split(" "));
        }
    }
}
