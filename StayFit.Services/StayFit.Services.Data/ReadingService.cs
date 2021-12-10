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
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public ReadingService(AppDbContext dbContext, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }


        public async Task<IEnumerable<ReadingPreviewModel>> LoadPreviewsByMainCategory(string mainCategory)
        {
            mainCategory = mainCategory?.ToLower();
            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == mainCategory))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            var subCategories = await this.dbContext.ReadingSubCategories
                .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory)
                .ToListAsync();
            IEnumerable<ReadingPreviewModel> previews = null;

            if (subCategories.Count != 0)
            {
                previews = await this.dbContext.ReadingSubCategories
               .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mainCategory)
               .Select(sc => new ReadingPreviewModel
               {
                   Id = sc.Id,
                   Title = sc.Name,
                   SearchName = sc.SearchName,
                   ImageURL = sc.ImageUrl
               })
               .ToListAsync();

                return previews;
            }

            previews = await this.dbContext.Readings
            .Where(reading => reading.ReadingMainCategory.SearchName.ToLower() == mainCategory)
            .Select(r => new ReadingPreviewModel
            {
                Id = r.Id,
                Title = r.Title,
                ImageURL = r.ImageUrl,
                SearchName = r.SearchTitle
            })
            .ToListAsync();
            return previews;
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
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
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
                    Categories = readingSubCategories
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
        public async Task<IEnumerable<ReadingModel>> LoadReadingsBySubCategory(string mainCategory, string subCategory)
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
                throw new ArgumentException($"{mainCategory} does not have {subCategory}");
            }

            var readings = await this.dbContext.Readings
                .Where(reading => reading.ReadingSubCategory.SearchName.ToLower() == subCategory)
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .ToListAsync();

            return readings;
        }

        //TODO: Decide if I want to remove mainCategories array and return all by default instead of passing all enitites in array???
        /// <summary>
        /// Loads latest subgroups if mainCategory has some. Otherwise it loads only latest readings.
        /// </summary>
        /// <param name="mainCategory"></param>
        /// <returns></returns>
        public async Task<IEnumerable<LatestCategoryReadings>> LoadLatest(string[] mainCategories)
        {
            mainCategories = mainCategories.Select(mc => mc.ToLower()).ToArray();

            foreach (var mc in mainCategories)
            {
                if (!this.dbContext.ReadingMainCategories.Any(mainCategory => mainCategory.SearchName.ToLower() == mc))
                {
                    throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
                }
            }
            var latestReadings = new List<LatestCategoryReadings>();

            foreach (var mc in mainCategories)
            {
                var categoryReadings = new LatestCategoryReadings();

                categoryReadings.Name = this.dbContext.ReadingMainCategories
                    .FirstOrDefaultAsync(mainCategory => mainCategory.SearchName.ToLower() == mc)
                    .GetAwaiter()
                    .GetResult().Name;

                if (this.dbContext.ReadingSubCategories.Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mc).Count() > 0)
                {
                    categoryReadings.Readings = await this.dbContext.ReadingSubCategories
                        .Where(sc => sc.ReadingMainCategory.SearchName.ToLower() == mc)
                        .OrderByDescending(sc => sc.CreatedOn)
                        .Select(sc => new LatestReading
                        {
                            Title = sc.Name,
                            ImageURL = sc.ImageUrl,
                            SearchTitle = sc.SearchName,
                            MainCategoryName = sc.ReadingMainCategory.Name
                        })
                        .Take(4)
                        .ToListAsync();
                    categoryReadings.HasChildren = true;
                }
                else
                {
                    categoryReadings.Readings = await this.dbContext.Readings
                        .Where(r => r.ReadingMainCategory.SearchName.ToLower() == mc)
                        .OrderByDescending(r => r.CreatedOn)
                        .Select(r => new LatestReading
                        {
                            Title = r.Title,
                            ImageURL = r.ImageUrl,
                            SearchTitle = r.SearchTitle,
                            MainCategoryName = r.ReadingMainCategory.Name,
                        })
                        .Take(4)
                        .ToListAsync();
                    categoryReadings.HasChildren = false;
                }
                latestReadings.Add(categoryReadings);
            }

            return latestReadings;
        }

        /// <summary>
        /// Loads reading by id, based category and subcategory rather than all readings in database.
        /// </summary>
        /// <param name="category"></param>
        /// <param name="subCategory"></param>
        /// <param name="readingId"></param>
        /// <returns></returns>
        public async Task<ReadingModel> LoadReadingByIdInSubGroup(string category, int readingId, int? subCategory)
        {
            category = category?.ToLower();

            if (!this.dbContext.ReadingMainCategories.Any(mc => mc.SearchName.ToLower() == category))
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, category));
            }

            var reading = await this.dbContext.Readings
                .Where(reading => reading.Id == readingId && reading.ReadingMainCategory.SearchName.ToLower() == category && reading.ReadingSubCategoryId == subCategory)
                .ProjectTo<ReadingModel>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (reading == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "reading"));
            }

            return reading;
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

        /// <summary>
        /// ok
        /// </summary>
        /// <param name="bodyPart"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ReadingModel>> LoadExerciseByBodyPart(string bodyPart)
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


            return readings;
        }

        public string TransformNameToLatin(string input)
        {
            return this.dbContext.Readings
                .OrderByDescending(x => x.Id)
                .FirstOrDefault().Id + 1 + "_" + String.Join("_", Transliteration.CyrillicToLatin(input).ToLower().Split(" "));
        }

        public async Task<IEnumerable<MainCategoryDto>> LoadBaseCategories()
        {
            var categories = await this.dbContext.ReadingMainCategories
                .Select(x => new MainCategoryDto { Name = x.Name, SearchName = x.SearchName, Id = x.Id })
                .ToListAsync();

            return categories;
        }
    }
}
