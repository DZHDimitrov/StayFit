namespace StayFit.Infrastructure
{
    using AutoMapper;
    using StayFit.Data.Models.FoodModels;
    using StayFit.Data.Models.Forum;
    using StayFit.Shared.Forum;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<FoodCategory, FoodCategoryModel>().ForMember(c => c.Name, cfg => cfg.MapFrom(c=> c.Category));
            this.CreateMap<Food, SingleFoodCategoryModel>().ForMember(f => f.Name, cfg => cfg.MapFrom(f => f.FoodName.Name));
            this.CreateMap<PostMainCategory, PostMainCategoryModel>();
            this.CreateMap<PostSubCategory, PostSubCategoryModel>();
        }
    }
}
