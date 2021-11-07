namespace StayFit.Shared.Forum
{

    using System.Collections.Generic;

    public class PostMainCategoryModel
    {
        public string Name { get; set; }

        public IEnumerable<PostSubCategoryModel> PostSubCategories { get; set; }
    }
}
