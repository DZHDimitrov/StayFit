using StayFit.Shared;
using StayFit.Shared.SharedModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IReadingService
    {
        public void CreateReading(CreateReading model);

        public void EditArticle();

        public void DeleteArticle();

        public IEnumerable<ReadingModel> GetLatestReadings(string readingCategory);

        public IEnumerable<ReadingModel> GetReadingsByMainCategory(string readingCategory);

        public IEnumerable<ReadingModel> GetReadingsBySubCategory(string mainCategory,string subCategory);

        public IEnumerable<ReadingSubCategoryModel> GetSubCategoriesByMainCategory(string readingCategory);

        public IEnumerable<ReadingSubCategoryModel> GetLatestSubCategories(string readingCategory);

        public ReadingModel GetReadingBySearchName(string subCategory,string readingSearchName);

        public IEnumerable<ReadingModel> GetExerciseByBodyPart(string bodyPart);

        public string TransformNameToCyrillic(string input);

    }
}
