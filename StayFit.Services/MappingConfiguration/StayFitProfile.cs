using AutoMapper;
using StayFit.Data.Models;
using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;
using StayFit.Shared.Nutritions;
using StayFit.Shared.Nutritions.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.MappingConfiguration
{
    public class StayFitProfile : Profile
    {
        public StayFitProfile()
        {
        }
    }
}
