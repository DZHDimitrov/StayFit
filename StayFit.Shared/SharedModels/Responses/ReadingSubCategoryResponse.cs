namespace StayFit.Shared.SharedModels.Responses
{

    using System.Collections.Generic;

    public class ReadingSubCategoryResponse
    {
        public IEnumerable<ReadingSubCategoryModel> ReadingsSubCategories { get; set; }
    }
}
