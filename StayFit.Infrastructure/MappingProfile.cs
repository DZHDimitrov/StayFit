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
    using StayFit.Shared.Readings;
    using StayFit.Shared.SharedModels;
    using System.Collections.Generic;
    using System.Linq;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<FoodCategory, FoodCategoryModel>().ForMember(c => c.Name, cfg => cfg.MapFrom(c=> c.Category));
            this.CreateMap<Food, CategoryFoodModel>().ForMember(f => f.Name, cfg => cfg.MapFrom(f => f.FoodName.Name));
            this.CreateMap<PostMainCategory, PostMainCategoryModel>();
            this.CreateMap<PostSubCategory, PostSubCategoryModel>();

            this.CreateMap<Reading, ReadingModel>();
            this.CreateMap<AddReadingRequest, Reading>();

            //new
            //this.CreateMap<ReadingSubCategory, ReadingPreviewModel>()
            //    .ForMember(c => c.MainCategoryName, cfg => cfg.MapFrom(c => c.ReadingMainCategory.SearchName.ToLower()))
            //    .ForMember(c => c.HasChildren, cfg => cfg.MapFrom(c => true));

            //this.CreateMap<Reading, ReadingPreviewModel>()
            //    .ForMember(c => c.Name, cfg => cfg.MapFrom(c => c.Title))
            //    .ForMember(c => c.SearchName, cfg => cfg.MapFrom(c => c.SearchTitle))
            //    .ForMember(c => c.MainCategoryName, cfg => cfg.MapFrom(c => c.ReadingMainCategory.SearchName.ToLower()))
            //    .ForMember(c => c.HasChildren, cfg => cfg.MapFrom(c => false));

            //this.CreateMap<ReadingMainCategory, ReadingCategoryPreviewsModel>()
            //    .ForMember(c => c.HasChildren, cfg => cfg.MapFrom(c => c.ReadingSubCategories.Any()))
            //    .ForMember(c => c.IsRoot, cfg => cfg.MapFrom(c => true))
        }
    }
}
