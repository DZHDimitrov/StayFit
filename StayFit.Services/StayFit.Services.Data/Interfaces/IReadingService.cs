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

        public Task<ReadingDeleteResponse> DeleteReading(int articleId);

        public Task<ReadingResponse> LoadLatest(string readingCategory);

        public Task<ReadingResponse> LoadByMainCategory(string readingCategory);

        public Task<ReadingResponse> LoadReadingsBySubCategory(string mainCategory,string subCategory);

        //public Task<ReadingSubCategoryResponse> LoadSubCategoriesByMainCategory(string readingCategory);

        //public Task<ReadingResponse> LoadLatestSubCategories(string readingCategory);

        public Task<ReadingResponse> LoadReadingByIdInSubGroup(string mainCategory,int? subCategory,int readingId);

        public Task<ReadingResponse> LoadExerciseByBodyPart(string bodyPart);

        public string TransformNameToLatin(string input);

    }
}
