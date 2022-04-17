using AutoMapper;
using AutoMapper.QueryableExtensions;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;

using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.ReadingModels;
using StayFit.Infrastructure;
using StayFit.Services.Common;
using StayFit.Services.StayFit.Services.Data.Interfaces;

using StayFit.Shared.Readings;
using StayFit.Shared.Readings.Requests;
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
        private readonly IDeletableEntityRepository<Reading> readings;
        private readonly IFormatService formatService;
        private readonly IMapper mapper;
        private readonly Cloudinary cloudinary;

        public ReadingService(
            IRepository<ReadingMainCategory> mainCategories,
            IRepository<ReadingSubCategory> subCategories,
            IDeletableEntityRepository<Reading> readings,
            IFormatService _formatService,
            IMapper mapper,
            Cloudinary cloudinary)
        {
            this.mainCategories = mainCategories;
            this.subCategories = subCategories;
            this.readings = readings;
            formatService = _formatService;
            this.mapper = mapper;
            this.cloudinary = cloudinary;
        }

        //Checked
        public async Task<IEnumerable<ReadingCategoryModel>> LoadCategories(int? mainId)
        {
            if (mainId == null)
            {
                return await this.mainCategories
                    .All()
                    .Select(mc => new ReadingCategoryModel
                    {
                        Id = mc.Id,
                        Name = mc.Name,
                    })
                    .ToListAsync();
            }

            return await this.subCategories
                .All()
                .Where(sc => sc.ReadingMainCategoryId == (int)mainId && !sc.Name.Contains("Хранителен"))
                .Select(sc => new ReadingCategoryModel
                {
                    Id = sc.Id,
                    Name = sc.Name
                })
                .ToListAsync();
        }

        //Checked
        public async Task<AddReadingResponse> CreateReading(AddReadingRequest model)
        {
            var mainCategory = await this.mainCategories
                .All()
                .Where(mc => mc.Id == model.ReadingMainCategoryId)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(mainCategory, "Категорията");

            var subCategory = await this.subCategories
                .All()
                .Where(sc => sc.ReadingMainCategoryId == model.ReadingMainCategoryId)
                .FirstOrDefaultAsync();

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

        //Checked
        public async Task<EditReadingModel> LoadReadingForEdit(int readingId)
        {
            var reading = await readings
                .All()
                .Where(r => r.Id == readingId)
                .Select(r => new EditReadingModel
                {
                    Id = r.Id,
                    Content = r.Content,
                    ImageUrl = r.ImageUrl,
                    Title = r.Name,
                    MainCategoryId = r.ReadingMainCategoryId,
                    SubCategoryId = r.ReadingSubCategoryId
                })
                .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Четивото");

            return reading;
        }

        public async Task<EditReadingResponse> EditReading(int readingId, EditReadingRequest model)
        {
            var reading = await readings
                .All()
                .Where(r => r.Id == readingId)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Четивото");

            var mainCategory = await mainCategories
                .All()
                .Where(mc => mc.Id == model.ReadingMainCategoryId)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Категорията");

            var subCategory = await subCategories
               .All()
               .Where(sc => sc.Id == model.ReadingSubCategoryId)
               .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Категорията");

            if (model.Image != null)
            {
                var imageUrl = await ApplicationCloudinary.UploadImage(this.cloudinary, model.Image, model.Title);
                reading.ImageUrl = imageUrl;
            }

            reading.ReadingMainCategory = mainCategory;
            reading.ReadingSubCategory = subCategory;
            reading.ReadingSubCategory = subCategory;
            reading.Name = model.Title;
            reading.Content = model.Content;

            readings.Update(reading);
            await readings.SaveChangesAsync();

            return new EditReadingResponse
            {
                Id = reading.Id,
                Title = reading.Name,
                Content = reading.Content,
                ImageUrl = reading.ImageUrl,
            };
        }

        //checked
        public async Task<ReadingDeleteResponse> DeleteReading(int id)
        {
            var reading = await this.readings
                .All()
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Четивото");

            readings.Delete(reading);
            await readings.SaveChangesAsync();

            return new ReadingDeleteResponse
            {
                Id = reading.Id,
                Title = reading.Name
            };
        }

        //Checked
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
                                 .Where(r => !r.IsDeleted)
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

        //Checked
        public async Task<MainCategoryWithPreviewsModel> LoadMainCategoryWithPreviews(string mainCategory)
        {
            mainCategory = formatService.ReplaceDelimiter("_", " ", mainCategory);

            var currentMainCategory = await this.mainCategories
                .All()
                .Where(mc => mc.Name.ToLower() == mainCategory)
                .Include(mc => mc.ReadingSubCategories)
                .Include(mc => mc.Readings)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(currentMainCategory, "Категорията");

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
                    .Where(r => !r.IsDeleted)
                    .ProjectTo<ReadingPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToList();

                mainCategoryWithPreviewsModel.HasSubGroups = false;
            }
            else
            {
                mainCategoryWithPreviewsModel.CategoryNames = currentMainCategory.ReadingSubCategories
                    .Select(rsb => rsb.Name)
                    .ToList();

                mainCategoryWithPreviewsModel.Previews = currentMainCategory.ReadingSubCategories
                    .AsQueryable()
                    .ProjectTo<ReadingPreviewModel>(this.mapper.ConfigurationProvider)
                    .ToList();

                mainCategoryWithPreviewsModel.HasSubGroups = true;
            }

            return mainCategoryWithPreviewsModel;
        }

        //Checked
        public async Task<SubCategoryWithPreviewsModel> LoadSubCategoryWithPreviews(string mainCategory, string subCategory)
        {
            mainCategory = formatService.ReplaceDelimiter("_", " ", mainCategory);
            subCategory = formatService.ReplaceDelimiter("_", " ", subCategory);

            var currentMainCategory = await this.mainCategories
                .All()
                .Where(mc => mc.Name == mainCategory)
                .Include(mc => mc.ReadingSubCategories)
                .ThenInclude(rsb => rsb.Readings)
                .FirstOrDefaultAsync();

            Guards.AgainstNull(currentMainCategory, "Категорията");

            var currentSubCategory = currentMainCategory.ReadingSubCategories
                .Where(sc => sc.Name.ToLower() == subCategory || sc.Name.ToLower().Contains(subCategory))
                .FirstOrDefault();

            Guards.AgainstNull(currentSubCategory, "Категорията");

            var subCategoryWithPreviewsModel = new SubCategoryWithPreviewsModel
            {
                Title = currentSubCategory.Name,
                CategoryNames = currentMainCategory.ReadingSubCategories
                                                   .Select(rsb => rsb.Name)
                                                   .ToList(),
                Previews = currentSubCategory?.Readings.Count > 0 ?
                currentSubCategory.Readings
                .Where(r => !r.IsDeleted)
                .Select(r => new ReadingPreviewModel
                {
                    Id = r.Id,
                    Name = r.Name,
                    ImageUrl = r.ImageUrl,
                })
                .ToList() : new List<ReadingPreviewModel>()
            };

            return subCategoryWithPreviewsModel;
        }

        //Checked
        public async Task<ReadingModel> LoadReading(int readingId)
        {
            var reading = await this.readings
                .All()
                .Where(r => r.Id == readingId)
                .Select(r => new ReadingModel
                {
                    Id = r.Id,
                    Content = r.Content,
                    ImageUrl = r.ImageUrl,
                    Title = r.Name
                })
                .FirstOrDefaultAsync();

            Guards.AgainstNull(reading, "Четивото");

            return reading;
        }
    }
}
