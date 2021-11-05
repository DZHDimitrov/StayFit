using Microsoft.AspNetCore.Identity;
using NickBuhro.Translit;
using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.ReadingModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared;
using StayFit.Shared.SharedModels;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<ReadingModel> GetReadingsByMainCategory(string readingCategory)
        {
            return this.dbContext.Readings
                .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .Select(reading => new ReadingModel
                {
                    Id = reading.Id,
                    Content = reading.Content,
                    ImageUrl = reading.ImageUrl,
                    Title = reading.Title
                })
                .ToList();
        }

        public IEnumerable<ReadingModel> GetReadingsBySubCategory(string mainCategory,string subCategory)
        {
            return this.dbContext.Readings
                .Where(reading => reading.ReadingSubCategory.SearchName.ToLower() == subCategory.ToLower() && mainCategory.ToLower() == reading.ReadingMainCategory.SearchName.ToLower())
                .Select(reading => new ReadingModel
                {
                    Id = reading.Id,
                    Content = reading.Content,
                    ImageUrl = reading.ImageUrl,
                    Title = reading.Title
                })
                .ToList();
        }

        public IEnumerable<ReadingModel> GetLatestReadings(string readingCategory)
        {
            return this.dbContext.Readings
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
                .ToList();
        }

        public IEnumerable<ReadingSubCategoryModel> GetLatestSubCategories(string readingCategory)
        {
            return this.dbContext.ReadingSubCategories
                .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .OrderByDescending(subCategory => subCategory.CreatedOn)
                .Select(subCategory => new ReadingSubCategoryModel
                {
                    Name = subCategory.Name,
                    ImageUrl = subCategory.ImageUrl
                })
                .Take(4)
                .ToList();
        }

        public IEnumerable<ReadingSubCategoryModel> GetSubCategoriesByMainCategory(string readingCategory)
        {
            return this.dbContext.ReadingSubCategories
                .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == readingCategory.ToLower())
                .Select(subCategory => new ReadingSubCategoryModel
                {
                    Name = subCategory.Name,
                    ImageUrl = subCategory.ImageUrl
                })
                .ToList();
        }

        public ReadingModel GetReadingBySearchName(string subCategory, string readingSearchName)
        {
            if (subCategory != null)
            {
                return this.dbContext.Readings
                    .Where(reading => reading.SearchTitle == readingSearchName && reading.ReadingSubCategory.SearchName == subCategory)
                    .Select(reading => new ReadingModel
                    {
                        Id = reading.Id,
                        Title = reading.Title,
                        Content = reading.Content,
                        ImageUrl = reading.ImageUrl
                    })
                    .FirstOrDefault();
            }
            return this.dbContext.Readings
               .Where(reading => reading.SearchTitle == readingSearchName)
               .Select(reading => new ReadingModel
               {
                   Id = reading.Id,
                   Title = reading.Title,
                   Content = reading.Content,
                   ImageUrl = reading.ImageUrl
               })
               .FirstOrDefault();
        }

        public IEnumerable<ReadingModel> GetExerciseByBodyPart(string bodyPart)
        {
            return this.dbContext.Readings
                .Where(x => x.BodyPart != null && x.BodyPart.SearchName.ToLower() == bodyPart.ToLower())
                .Select(x => new ReadingModel
                {
                    Id = x.Id,
                    Content = x.Content,
                    ImageUrl = x.ImageUrl,
                    Title = x.Title
                })
                .ToList();
        }

        public void CreateReading(CreateReading model)
        {
            var mainCategory = this.dbContext.ReadingMainCategories.FirstOrDefault(x => x.Id == model.MainGroupId);
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
                var subCategory = this.dbContext.ReadingSubCategories.FirstOrDefault(x => x.Id == model.SubGroup.Id);
                reading.ReadingSubCategory = subCategory;
                if (subCategory.SearchName == "Exercises")
                {
                    var bodyPart = this.dbContext.BodyParts.FirstOrDefault(x => x.Id == model.SubGroup.bodyPartId);
                    reading.BodyPart = bodyPart;
                }
            }
            this.dbContext.Readings.Add(reading);
            this.dbContext.SaveChanges();
        }

        public string TransformNameToCyrillic(string input)
        {
            return this.dbContext.Readings
                .OrderByDescending(x => x.Id)
                .FirstOrDefault().Id + 1 + "_" + String.Join("_", Transliteration.CyrillicToLatin(input).ToLower().Split(" "));
        }
    }
}
