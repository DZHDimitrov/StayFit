using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.SharedModels;
using StayFit.Shared.SharedModels.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IReadingService
    {
        public Task<AddReadingResponse> CreateReading(AddReadingRequest model);

        public Task<IEnumerable<ReadingCategoryModel>> LoadCategories(int? mainId);

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
