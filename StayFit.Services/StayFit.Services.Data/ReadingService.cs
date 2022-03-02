using AutoMapper;
using AutoMapper.QueryableExtensions;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;

using StayFit.Common;

using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.ReadingModels;
using StayFit.Services.Common;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.Readings.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ReadingService : IReadingService
    {
        private readonly IRepository<ReadingMainCategory> mainCategories;
        private readonly IRepository<ReadingSubCategory> subCategories;
        private readonly IRepository<Reading> readings;

        private readonly IMapper mapper;
        private readonly Cloudinary cloudinary;

        public ReadingService(
            IRepository<ReadingMainCategory> mainCategories,
            IRepository<ReadingSubCategory> subCategories,
            IRepository<Reading> readings,
            IMapper mapper, 
            Cloudinary cloudinary)
        {
            this.mainCategories = mainCategories;
            this.subCategories = subCategories;
            this.readings = readings;
            this.mapper = mapper;
            this.cloudinary = cloudinary;
        }

        public async Task<KnowledgeModel> LoadKnowledge()
        {
            var knowledgeModel = new KnowledgeModel();

            knowledgeModel.Title = "Знание";

            knowledgeModel.CategoryNames = this.mainCategories
                .All()
                .Select(mc => mc.Name.ToString())
                .ToList();

            knowledgeModel.ReadingPreviewsWithCategory = await this.mainCategories
                .All()
                .Select(mc => new ReadingPreviewsWithCategoryModel
                {
                    CategoryId = mc.Id,
                    Name = mc.Name,
                    Previews = mc.ReadingSubCategories.Any() ?
                               mc.ReadingSubCategories
                                 .OrderByDescending(sc => sc.CreatedOn)
                                 .Select(sc => new ReadingPreviewModel
                                 {
                                     Id = sc.Id,
                                     Name = sc.Name,
                                     ImageUrl = sc.ImageUrl,
                                 })
                                 .Take(4)
                                 .ToList() :
                               mc.Readings
                                 .OrderByDescending(r => r.CreatedOn)
                                 .Select(r => new ReadingPreviewModel
                                 {
                                     Id = r.Id,
                                     Name = r.Name,
                                     ImageUrl = r.ImageUrl,
                                 })
                                 .Take(4)
                                 .ToList()
                })
                .ToListAsync();

            return knowledgeModel;
        }


        public async Task<MainCategoryWithPreviewsModel> LoadMainCategoryWithPreviews(string mainCategory)
        {
            mainCategory = string.Join(" ", mainCategory?.Split("_", StringSplitOptions.RemoveEmptyEntries)).ToLower();

            var existingCategory = await this.mainCategories.All().Where(mc => mc.Name.ToLower() == mainCategory).FirstOrDefaultAsync();

            if (existingCategory == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            var currentMainCategory = await this.mainCategories
                .All()
                .Include(mc => mc.ReadingSubCategories)
                .Include(mc => mc.Readings)
                .Where(mc => mc.Name.ToLower() == mainCategory)
                .FirstOrDefaultAsync();

            var mainCategoryWithPreviewsModel = new MainCategoryWithPreviewsModel();

            mainCategoryWithPreviewsModel.Title = currentMainCategory.Name;

            if (!currentMainCategory.ReadingSubCategories.Any())
            {
                mainCategoryWithPreviewsModel.CategoryNames = await this.mainCategories
                    .All()
                    .Select(c => c.Name)
                    .ToListAsync();

                mainCategoryWithPreviewsModel.Previews = currentMainCategory.Readings
                    .AsQueryable()
                    .ProjectTo<ReadingPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToList();

                mainCategoryWithPreviewsModel.HasSubGroups = false;
            }
            else
            {
                mainCategoryWithPreviewsModel.CategoryNames = currentMainCategory.ReadingSubCategories.Select(rsb => rsb.Name).ToList();

                mainCategoryWithPreviewsModel.Previews = currentMainCategory.ReadingSubCategories
                    .AsQueryable()
                    .ProjectTo<ReadingPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToList();

                mainCategoryWithPreviewsModel.HasSubGroups = true;
            }

            return mainCategoryWithPreviewsModel;
        }

        public async Task<SubCategoryWithPreviewsModel> LoadSubCategoryWithPreviews(string mainCategory, string subCategory)
        {
            mainCategory = string.Join(" ", mainCategory?.Split("_")).ToLower();
            subCategory = string.Join(" ", subCategory?.Split("_")).ToLower();


            var existingCategory = await this.mainCategories.All().Where(mc => mc.Name.ToLower() == mainCategory).FirstOrDefaultAsync();

            if (existingCategory == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            var subCategories = await this.subCategories.All()
                .Where(sc => sc.ReadingMainCategory.Name.ToLower() == mainCategory)
                .ToListAsync();

            //if (subCategories.Count == 0)
            //{
            //    throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND), "sub-groups");
            //}

            var currentMainCategory = await this.mainCategories
                .All()
                .Include(mc => mc.ReadingSubCategories)
                .ThenInclude(rsb => rsb.Readings)
                .Where(mc => mc.Name == mainCategory)
                .FirstOrDefaultAsync();

            var currentSubCategory = currentMainCategory.ReadingSubCategories
                .Where(sc => sc.Name.ToLower() == subCategory || sc.Name.ToLower().Contains(subCategory))
                .FirstOrDefault();

            //if (currentSubCategory == null)
            //{
            //    throw new ArgumentException($"{mainCategory} does not contain {subCategory}");
            //}

            var subCategoryWithPreviewsModel = new SubCategoryWithPreviewsModel
            {
                Title = currentSubCategory?.Name ?? "Групата не съществува",
                CategoryNames = currentMainCategory.ReadingSubCategories.Select(rsb => rsb.Name).ToList(),
                Previews = currentSubCategory?.Readings.Count > 0 ? currentSubCategory.Readings.Select(r => new ReadingPreviewModel
                {
                    Id = r.Id,
                    Name = r.Name,
                    ImageUrl = r.ImageUrl,
                }).ToList() : new List<ReadingPreviewModel>()
            };

            return subCategoryWithPreviewsModel;
        }

        public async Task<AddReadingResponse> CreateReading(AddReadingRequest model)
        {
            var mainCategory = await this.mainCategories
                .All()
                .Where(mc => mc.Id == model.ReadingMainCategoryId)
                .FirstOrDefaultAsync();

            if (mainCategory == null)
            {
                throw new ArgumentException(string.Format(GlobalConstants.ITEM_NOT_FOUND, "group"));
            }

            var subCategory = await this.subCategories
                .All()
                .Where(sc => sc.ReadingMainCategoryId == model.ReadingMainCategoryId)
                .FirstOrDefaultAsync();

            if (subCategory == null && model.ReadingSubCategoryId != null)
            {
                throw new ArgumentException($"This group cannot have sub-categories!");
            }

            var imageUrl = await ApplicationCloudinary.UploadImage(this.cloudinary, model.Image, model.Title);

            var reading = new Reading
            {
                ReadingMainCategoryId = model.ReadingMainCategoryId,
                ReadingSubCategoryId = model.ReadingSubCategoryId ?? null,
                CreatedOn = DateTime.UtcNow,
                Name = model.Title,
                Content = model.Content,
                ImageUrl = imageUrl
            };

            await this.readings.AddAsync(reading);
            await this.readings.SaveChangesAsync();

            return new AddReadingResponse
            {
                Id = reading.Id,
                Title = reading.Name,
            };
        }

        public async Task<ReadingDeleteResponse> DeleteReading(int id)
        {
            var article = await this.readings.All().Where(r => r.Id == id).FirstOrDefaultAsync();
            //this.dbContext.Readings.Remove(article);
            //this.dbContext.SaveChanges();

            return new ReadingDeleteResponse
            {
                Id = article.Id,
                Title = article.Name
            };
        }

        public void EditArticle()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ReadingCategoryModel>> LoadCategories(int? mainId)
        {
            if (mainId == null)
            {
                return await this.mainCategories.All()
                    .Select(mc => new ReadingCategoryModel
                    {
                        Id = mc.Id,
                        Name = mc.Name,
                    }).ToListAsync();
            }

            return await this.subCategories.All()
                .Where(sc => sc.ReadingMainCategoryId == (int)mainId)
                .Select(sc => new ReadingCategoryModel
                {
                    Id = sc.Id,
                    Name = sc.Name
                })
                .ToListAsync();
        }

        public async Task<ReadingModel> LoadReading(string mainCategory, string subCategory, int? readingId)
        {
            var currentMainCategory = await this.mainCategories
                .All()
                .Include(rmc => rmc.ReadingSubCategories)
                .ThenInclude(rmc => rmc.Readings)
                .Include(rmc => rmc.Readings)
                .Where(rmc => rmc.Name.ToLower() == mainCategory)
                .FirstOrDefaultAsync();

            ReadingModel readingModel = null;

            if (currentMainCategory == null)
            {
                throw new ArgumentException("Not found");
            }

            var currentSubCategory = currentMainCategory.ReadingSubCategories
                .FirstOrDefault(rsb => rsb.Name == subCategory);

            if (currentSubCategory == null)
            {
                readingModel = currentMainCategory.Readings
                    .Where(r => r.Id == readingId)
                    .Select(r => new ReadingModel
                    {
                        Id = r.Id,
                        ImageUrl = r.ImageUrl,
                        Title = r.Name,
                        Content = r.Content,
                    })
                    .FirstOrDefault();
            }
            else
            {
                readingModel = currentSubCategory.Readings
                    .Where(r => r.Id == readingId)
                    .Select(r => new ReadingModel
                    {
                        Id = r.Id,
                        ImageUrl = r.ImageUrl,
                        Title = r.Name,
                        Content = r.Content,
                    })
                    .FirstOrDefault();
            }

            return readingModel;
        }
    }
}
