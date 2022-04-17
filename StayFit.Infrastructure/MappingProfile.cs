namespace StayFit.Infrastructure
{
    using AutoMapper;

    using StayFit.Data.Models.FoodModels;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ProgerssModels;
    using StayFit.Data.Models.ReadingModels;

    using StayFit.Shared.Forum;
    using StayFit.Shared.Nutritions;
    using StayFit.Shared.Nutritions.Food;
    using StayFit.Shared.Progress;
    using StayFit.Shared.Readings;
    using StayFit.Shared.Readings.Requests;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Food
            this.CreateMap<FoodCategory, FoodCategoryModel>().ForMember(c => c.Name, cfg => cfg.MapFrom(c=> c.Category));

            this.CreateMap<Food, FoodPreviewModel>()
                .ForMember(f => f.Name, cfg => cfg.MapFrom(f => f.FoodType.Name));

            //Forum
            this.CreateMap<PostMainCategory, PostMainCategoryModel>();

            this.CreateMap<PostSubCategory, PostSubCategoryModel>();

            //Readings
            this.CreateMap<Reading, ReadingModel>();

            this.CreateMap<AddReadingRequest, Reading>();

            this.CreateMap<Reading, ReadingPreviewModel>();

            this.CreateMap<ReadingSubCategory, ReadingPreviewModel>();

            //Progress
            this.CreateMap<Measurement, MeasurementModel>()
                .ForMember(f => f.DateOfMeasurement, cfg => cfg.MapFrom(f => f.DateOfMeasurment.ToString()));
        }
    }
}
