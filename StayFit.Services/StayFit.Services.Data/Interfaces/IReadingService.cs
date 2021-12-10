using StayFit.Shared;
using StayFit.Shared.Readings;
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

        public Task<IEnumerable<LatestCategoryReadings>> LoadLatest(string[] mainCategories);

        //public Task<ReadingResponse> LoadByMainCategory(string readingCategory);
        public Task<IEnumerable<ReadingPreviewModel>> LoadPreviewsByMainCategory(string mainCategory);

        public Task<IEnumerable<ReadingModel>> LoadReadingsBySubCategory(string mainCategory,string subCategory);

        //public Task<ReadingSubCategoryResponse> LoadSubCategoriesByMainCategory(string readingCategory);

        //public Task<ReadingResponse> LoadLatestSubCategories(string readingCategory);

        public Task<ReadingModel> LoadReadingByIdInSubGroup(string mainCategory,int readingId, int? subCategory);

        public Task<IEnumerable<ReadingModel>> LoadExerciseByBodyPart(string bodyPart);

        public Task<IEnumerable<MainCategoryDto>> LoadBaseCategories();

        public string TransformNameToLatin(string input);

    }
}
