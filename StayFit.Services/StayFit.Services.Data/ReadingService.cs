using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using NickBuhro.Translit;

using StayFit.Common;

using StayFit.Data;
using StayFit.Data.Models;
using StayFit.Data.Models.ReadingModels;

using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ReadingService : IReadingService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public ReadingService(AppDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }


        public async Task<ReadingCategoryPreviewsModel> LoadPreviewsByMainCategory(string mainCategory)
        {
            mainCategory = mainCategory?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == mainCategory))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            return await this.dbContext.ReadingMainCategories
                .Where(mc => mc.SearchName == mainCategory)
                .Select(mc => new ReadingCategoryPreviewsModel
                {
                    Id = mc.Id,
                    Name = mc.Name,
                    SearchName = mc.SearchName.ToLower(),
                    HasChildren = mc.ReadingSubCategories.Any(),
                    IsRoot = true,
                    Previews = mc.ReadingSubCategories.Any() ?
                    mc.ReadingSubCategories.Select(sc =>
                    new ReadingPreviewModel
                    {
                        Id = sc.Id,
                        Name = sc.Name,
                        SearchName = sc.SearchName.ToLower(),
                        ImageUrl = sc.ImageUrl,
                        MainCategoryName = sc.ReadingMainCategory.SearchName.ToLower(),
                        HasChildren = true,
                    })
                    .ToList() :
                    mc.Readings.Select(r =>
                    new ReadingPreviewModel
                    {
                        Id = r.Id,
                        Name = r.Title,
                        SearchName = r.SearchTitle.ToLower(),
                        ImageUrl = r.ImageUrl,
                        MainCategoryName = r.ReadingMainCategory.SearchName.ToLower(),
                        HasChildren = false
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<ReadingCategoryPreviewsModel> LoadReadingsBySubCategory(string mainCategory, string subCategory)
        {
            mainCategory = mainCategory?.ToLower();
            subCategory = subCategory?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == mainCategory))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            var subCategories = await this.dbContext.ReadingSubCategories
                .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory)
                .ToListAsync();

            if (subCategories.Count == 0)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND), "sub-groups");
            }

            var currentSubCategory = await this.dbContext.ReadingSubCategories
                .FirstOrDefaultAsync(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory && sc.SearchName.ToLower() == subCategory);

            if (currentSubCategory == null)
            {
                throw new ArgumentException($"{mainCategory} does not contain {subCategory}");
            }

            var readings = await this.dbContext.ReadingSubCategories
                .Where(sc => sc.SearchName.ToLower() == subCategory)
                .Select(sc => new ReadingCategoryPreviewsModel
                {
                    Name = sc.Name,
                    SearchName = sc.SearchName.ToLower(),
                    HasChildren = false,
                    Previews = sc.Readings.Select(r => new ReadingPreviewModel
                    {
                        Id = r.Id,
                        Name = r.Title,
                        SearchName = r.SearchTitle,
                        ImageUrl = r.ImageUrl,
                        HasChildren = false,
                        MainCategoryName = sc.ReadingMainCategory.SearchName
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();

            readings.Categories = this.dbContext.ReadingSubCategories
                .Where(x => x.ReadingMainCategory.SearchName == mainCategory)
                .Select(x => new
                {
                    Name = x.Name,
                    SearchName = x.SearchName.ToLower()
                })
                .ToArray();

            return readings;
        }

        public async Task<IEnumerable<ReadingCategoryPreviewsModel>> LoadLatest()
        {
            var result = await this.dbContext.ReadingMainCategories
                .Select(mc => new ReadingCategoryPreviewsModel
                {
                    Id = mc.Id,
                    Name = mc.Name,
                    SearchName = mc.SearchName.ToLower(),
                    HasChildren = mc.ReadingSubCategories.Any(),
                    IsRoot = true,
                    Previews = mc.ReadingSubCategories.Any() ?
                    mc.ReadingSubCategories
                    .OrderByDescending(sc => sc.CreatedOn)
                    .Select(sc => new ReadingPreviewModel
                    {
                        Id = sc.Id,
                        Name = sc.Name,
                        SearchName = sc.SearchName.ToLower(),
                        ImageUrl = sc.ImageUrl,
                        MainCategoryName = sc.ReadingMainCategory.SearchName.ToLower(),
                        HasChildren = true
                    })
                    .Take(4)
                    .ToList() :
                    mc.Readings
                    .OrderByDescending(r => r.CreatedOn)
                    .Select(r => new ReadingPreviewModel
                    {
                        Id = r.Id,
                        Name = r.Title,
                        ImageUrl = r.ImageUrl,
                        SearchName = r.SearchTitle.ToLower(),
                        MainCategoryName = r.ReadingMainCategory.SearchName.ToLower(),
                        HasChildren = false,
                    })
                    .Take(4)
                    .ToList()
                })
                .ToListAsync();
            return result;
        }

        public async Task<ReadingModel> LoadReadingBySearchNameInMainCategory(string category, string searchName)
        {
            category = category.ToLower();
            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == category))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, category));
            }
            var reading = await this.dbContext.Readings
                .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == category && reading.SearchTitle.ToLower() == searchName.ToLower())
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (reading == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "reading"));
            }

            return reading;
        }

        public async Task<ReadingModel> LoadReadingByIdInSubGroup(string category, string subCategory, int readingId)
        {
            category = category?.ToLower();
            subCategory = subCategory?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == category))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, category));
            }

            var reading = await this.dbContext.Readings
                .Where(reading => reading.Id == readingId &&
                reading.ReadingMainCategory.SearchName.ToLower() == category &&
                reading.ReadingSubCategory.SearchName.ToLower() == subCategory)
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (reading == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "reading"));
            }

            return reading;
        }

        public async Task<AddReadingResponse> CreateReading(AddReadingRequest model)
        {

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.Id == model.ReadingMainCategoryId))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            if (!this.dbContext.ReadingSubCategories.Any(sc => sc.ReadingMainCategoryId == model.ReadingMainCategoryId) && (model.ReadingSubCategoryId != null || model.BodyPartId != null))
            {
                throw new ArgumentException($"This group cannot have sub-categories!");
            }

            var currentSubGroup = await this.dbContext.ReadingSubCategories.FirstOrDefaultAsync(sc => sc.Id == model.ReadingSubCategoryId);

            if (currentSubGroup?.SearchName == "Exercises" && model.BodyPartId == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.NOT_SPECIFIED_ERROR_MSG, "exercise", "bodypart"));
            }
            var reading = this.mapper.Map<Reading>(model);
            reading.SearchTitle = TransformNameToLatin(model.Title);
            await this.dbContext.Readings.AddAsync(reading);
            await this.dbContext.SaveChangesAsync();

            return new AddReadingResponse
            {
                Id = reading.Id,
                Title = reading.Title,
            };
        }

        public async Task<ReadingDeleteResponse> DeleteReading(int id)
        {
            var article = await this.dbContext.Readings.Where(r => r.Id == id).FirstOrDefaultAsync();
            this.dbContext.Readings.Remove(article);
            this.dbContext.SaveChanges();
            return new ReadingDeleteResponse
            {
                Id = article.Id,
                Title = article.Title
            };
        }

        public void EditArticle()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ReadingModel>> LoadExerciseByBodyPart(string bodyPart)
        {
            return await this.dbContext.Readings
                .Where(x => x.BodyPart != null && x.BodyPart.SearchName.ToLower() == bodyPart.ToLower())
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public string TransformNameToLatin(string input)
        {
            return this.dbContext.Readings
                .OrderByDescending(x => x.Id)
                .FirstOrDefault().Id + 1 + "_" + String.Join("_", Transliteration.CyrillicToLatin(input).ToLower().Split(" "));
        }

        public async Task<IEnumerable<ReadingMainCategoryModel>> LoadMainCategories()
        {
            return await this.dbContext.ReadingMainCategories
                .Select(mc => new ReadingMainCategoryModel
                {
                    Id = mc.Id,
                    Name = mc.Name,
                    HasChildren = mc.ReadingSubCategories.Any(),
                    SearchName = mc.SearchName,
                }).ToListAsync();
        }

        public async Task<IEnumerable<ReadingSubCategoryModel>> LoadSubCategories(int id)
        {
            return await this.dbContext.ReadingSubCategories
                 .Where(sc => sc.ReadingMainCategory.Id == id)
                 .Select(sc => new ReadingSubCategoryModel
                 {
                     Id = sc.Id,
                     Name = sc.Name,
                     ImageUrl = sc.ImageUrl,
                     SearchName = sc.SearchName
                 })
                 .ToListAsync();
        }
    }
}
