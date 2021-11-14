using StayFit.Shared;
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IReadingService
    {
        public Task<AddReadingResponse> CreateReading(AddReadingRequest model);

        public void EditArticle();

        public void DeleteArticle();

        public Task<ReadingResponse> LoadLatestReadings(string readingCategory);

        public Task<ReadingResponse> LoadReadingsByMainCategory(string readingCategory);

        public Task<ReadingResponse> LoadReadingsBySubCategory(string mainCategory,string subCategory);

        public Task<ReadingSubCategoryResponse> LoadSubCategoriesByMainCategory(string readingCategory);

        public Task<ReadingSubCategoryResponse> LoadLatestSubCategories(string readingCategory);

        public Task<ReadingResponse> LoadReadingBySearchName(string subCategory,string readingSearchName);

        public Task<ReadingResponse> LoadExerciseByBodyPart(string bodyPart);

        public string TransformNameToCyrillic(string input);

    }
}
