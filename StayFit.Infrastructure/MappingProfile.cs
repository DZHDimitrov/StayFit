namespace StayFit.Infrastructure
{
    using AutoMapper;
    using StayFit.Data.Models.FoodModels;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ReadingModels;
    using StayFit.Shared;
    using StayFit.Shared.Forum;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.SharedModels;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<FoodCategory, FoodCategoryPreviewModel>().ForMember(c => c.Name, cfg => cfg.MapFrom(c=> c.Category));
            this.CreateMap<Food, FoodPreviewModel>()
                .ForMember(f => f.Name, cfg => cfg.MapFrom(f => f.FoodName.Name))
                .ForMember(f => f.Category, cfg => cfg.MapFrom(f => f.FoodCategory.Category));
            this.CreateMap<Food, FoodKeywordModel>()
                .ForMember(f => f.Name, cfg => cfg.MapFrom(f => f.FoodName.Name))
                .ForMember(f => f.Category, cfg => cfg.MapFrom(f => f.FoodCategory.Category));

            this.CreateMap<PostMainCategory, PostMainCategoryModel>();
            this.CreateMap<PostSubCategory, PostSubCategoryModel>();

            this.CreateMap<Reading, ReadingModel>();
            this.CreateMap<AddReadingRequest, Reading>();
        }
    }
}
