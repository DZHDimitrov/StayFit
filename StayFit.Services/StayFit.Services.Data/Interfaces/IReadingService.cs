using StayFit.Shared;
using StayFit.Shared.Readings;
using StayFit.Shared.Readings.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IReadingService
    {
        public Task<KnowledgeModel> LoadKnowledge();

        public Task<MainCategoryWithPreviewsModel> LoadMainCategoryWithPreviews(string mainCategory);

        public Task<SubCategoryWithPreviewsModel> LoadSubCategoryWithPreviews(string mainCategory,string subCategory);

        public Task<ReadingModel> LoadReading(string mainCategory,string subCategory,int? readingId);

        public Task<AddReadingResponse> CreateReading(AddReadingRequest model);

        public void EditArticle();

        public Task<IEnumerable<ReadingCategoryModel>> LoadCategories(int? mainId);

        public Task<ReadingDeleteResponse> DeleteReading(int articleId);
    }
}
