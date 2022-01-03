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

        public Task<IEnumerable<ReadingMainCategoryModel>> LoadMainCategories();

        public Task<IEnumerable<ReadingSubCategoryModel>> LoadSubCategories(int id);

        public void EditArticle();

        public Task<ReadingDeleteResponse> DeleteReading(int articleId);

        public Task<IEnumerable<ReadingCategoryPreviewsModel>> LoadLatest();

        public Task<ReadingCategoryPreviewsModel> LoadPreviewsByMainCategory(string mainCategory);

        public Task<ReadingCategoryPreviewsModel> LoadPreviewsBySubCategory(string mainCategory,string subCategory);

        public Task<ReadingModel> LoadReadingByMainCategory(string category, string searchName);

        public Task<ReadingModel> LoadReadingByIdInSubGroup(string mainCategory,string subCategory,int readingId);


        public Task<IEnumerable<ReadingModel>> LoadExerciseByBodyPart(string bodyPart);

        public string TransformNameToLatin(string input);

    }
}
