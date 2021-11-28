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
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ReadingService : IReadingService
    {
        private readonly AppDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public ReadingService(AppDbContext dbContext, UserManager<ApplicationUser> userManager,IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        /// <summary>
        /// Loads subgroups if mainCategory has some. Otherwise it loads only readings.
        /// </summary>
        /// <param name="mainCategory"></param>
        /// <returns></returns>
        public async Task<ReadingResponse> LoadByMainCategory(string mainCategory)
        {
            mainCategory = mainCategory?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == mainCategory))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND,"group"));
            }

            var subCategories = await this.dbContext.ReadingSubCategories
                .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory)
                .ToListAsync();

            if (subCategories.Count != 0)
            {
                var readingSubCategories = await this.dbContext.ReadingSubCategories
               .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory)
               .ProjectTo<ReadingSubCategoryModel>(this.mapper.ConfigurationProvider)
               .ToListAsync();

                return new ReadingResponse
                {
                    ReadingsSubCategories = readingSubCategories
                };
            }

            var readings = await this.dbContext.Readings
            .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == mainCategory)
            .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
            .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        /// <summary>
        /// Loads readings only if they have the required subcategory.
        /// </summary>
        /// <param name="mainCategory"></param>
        /// <param name="subCategory"></param>
        /// <returns></returns>
        public async Task<ReadingResponse> LoadReadingsBySubCategory(string mainCategory, string subCategory)
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
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND),"sub-groups");
            }

            var currentSubCategory = await this.dbContext.ReadingSubCategories
                .FirstOrDefaultAsync(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory && sc.SearchName.ToLower() == subCategory);

            if (currentSubCategory == null)
            {
                throw new ArgumentException($"{mainCategory} does not have {subCategory}");
            }

            var readings = await this.dbContext.Readings
                .Where(reading => reading.ReadingSubCategory.SearchName.ToLower() == subCategory)
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings
            };
        }

        /// <summary>
        /// Loads latest subgroups if mainCategory has some. Otherwise it loads only latest readings.
        /// </summary>
        /// <param name="mainCategory"></param>
        /// <returns></returns>
        public async Task<ReadingResponse> LoadLatest(string mainCategory)
        {
            mainCategory = mainCategory?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == mainCategory))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            if (this.dbContext.ReadingSubCategories.Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory).Count() > 0)
            {
                var subCategories = await this.dbContext.ReadingSubCategories
                    .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == mainCategory)
                    .OrderByDescending(subCategory => subCategory.CreatedOn)
                    .ProjectTo<ReadingSubCategoryModel>(this.mapper.ConfigurationProvider)
                    .Take(4)
                    .ToListAsync();

                return new ReadingResponse
                {
                    ReadingsSubCategories = subCategories
                };
            }

            var readings = await this.dbContext.Readings
                 .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == mainCategory)
                 .OrderByDescending(reading => reading.CreatedOn)
                 .Take(4)
                 .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                 .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        /// <summary>
        /// Loads reading by id, based category and subcategory rather than all readings in database.
        /// </summary>
        /// <param name="category"></param>
        /// <param name="subCategory"></param>
        /// <param name="readingId"></param>
        /// <returns></returns>
        public async Task<ReadingResponse> LoadReadingByIdInSubGroup(string category, int? subCategory, int readingId)
        {
            category = category?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == category))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, category));
            }

            var readings = await this.dbContext.Readings
                .Where(reading => reading.Id == readingId && reading.ReadingMainCategory.SearchName.ToLower() == category && reading.ReadingSubCategoryId == subCategory)
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            if (readings.Count() == 0)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "reading"));
            }

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        /// <summary>
        /// Creates new reading based on category.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<AddReadingResponse> CreateReading(AddReadingRequest model)
        {

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.Id == model.ReadingMainCategoryId))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND,"group"));
            }

            if (!this.dbContext.ReadingSubCategories.Any(sc => sc.ReadingMainCategoryId == model.ReadingMainCategoryId) && (model.ReadingSubCategoryId != null || model.BodyPartId != null))
            {
                throw new ArgumentException($"This group cannot have sub-categories!");
            }

            var currentSubGroup = await this.dbContext.ReadingSubCategories.FirstOrDefaultAsync(sc => sc.Id == model.ReadingSubCategoryId);

            if (currentSubGroup?.SearchName == "Exercises" && model.BodyPartId == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.NOT_SPECIFIED_ERROR_MSG,"exercise","bodypart"));
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

        /// <summary>
        /// ok
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

 

        public async Task<ReadingResponse> LoadLatestSubCategories(string mainCategory)
        {
            var subCategories = await this.dbContext.ReadingSubCategories
                .Where(subCategory => subCategory.ReadingMainCategory.SearchName.ToLower() == mainCategory.ToLower())
                .OrderByDescending(subCategory => subCategory.CreatedOn)
                .Select(subCategory => new ReadingSubCategoryModel
                {
                    Name = subCategory.Name,
                    ImageUrl = subCategory.ImageUrl
                })
                .Take(4)
                .ToListAsync();

            return new ReadingResponse
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

        /// <summary>
        /// ok
        /// </summary>
        /// <param name="bodyPart"></param>
        /// <returns></returns>
        public async Task<ReadingResponse> LoadExerciseByBodyPart(string bodyPart)
        {
            var readings = await this.dbContext.Readings
                .Where(x => x.BodyPart != null && x.BodyPart.SearchName.ToLower() == bodyPart.ToLower())
                .Select(x => new ReadingModel
                {
                    Id = x.Id,
                    Content = x.Content,
                    ImageUrl = x.ImageUrl,
                    Title = x.Title,
                    SearchTitle = x.SearchTitle,
                })
                .ToListAsync();

            return new ReadingResponse
            {
                Readings = readings,
            };
        }

        public string TransformNameToLatin(string input)
        {
            return this.dbContext.Readings
                .OrderByDescending(x => x.Id)
                .FirstOrDefault().Id + 1 + "_" + String.Join("_", Transliteration.CyrillicToLatin(input).ToLower().Split(" "));
        }
    }
}
