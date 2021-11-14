namespace StayFit.Shared.Forum.Responses
{

    using System.Collections.Generic;

    public class LoadPostCategoriesResponse
    {
        public IEnumerable<PostMainCategoryModel> PostMainCategories { get; set; }
    }
}
