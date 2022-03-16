using Microsoft.EntityFrameworkCore;
using StayFit.Data.Common.Repositories;
using StayFit.Data.Models.ProgerssModels;
using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Progress;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using StayFit.Shared.Enums;

namespace StayFit.Services.StayFit.Services.Data
{
    public class ProgressService : IProgressService
    {
        private readonly IRepository<Measurement> measurementRepo;
        private readonly IMapper mapper;
        private readonly IBodyService bodyService;

        public ProgressService(IDeletableEntityRepository<Measurement> measurementRepo,IMapper mapper,IBodyService bodyService)
        {
            this.measurementRepo = measurementRepo;
            this.mapper = mapper;
            this.bodyService = bodyService;
        }

        public async Task<int> CreateMeasurement(string userId, CreateMeasurementModel model)
        {
            DateTime dateOfMeasurement;

            if (!DateTime.TryParse(model.DateOfMeasurement, out dateOfMeasurement))
            {
                throw new ArgumentException("Invalid model");
            }

            bool isValidModel = false;

            var properties = model
                .GetType()
                .GetProperties()
                .Where(p => p.Name != "DateOfMeasurment")
                .ToArray();

            ;

            foreach (var property in properties)
            {
                double value;
                var propValue = property.GetValue(model, null);

                if (propValue != null  && double.TryParse(propValue.ToString(), NumberStyles.Number, CultureInfo.InvariantCulture, out value))
                {
                    isValidModel = true;
                }

            }

            if (!isValidModel)
            {
                throw new ArgumentException("There must atleast one valid measurement");
            }

            var values = this.bodyService.GetParsedValues(model);

            var measure = await measurementRepo
                .All()
                .Where(m => m.ApplicationUserId == userId)
                .Where(m => m.DateOfMeasurment == dateOfMeasurement)
                .FirstOrDefaultAsync();

            if (measure != null)
            {
                measure.Weight = values[BodyPartType.Weight] ?? measure.Weight;
                measure.Height = values[BodyPartType.Height] ?? measure.Height;
                measure.Fats = values[BodyPartType.Fats] ?? measure.Fats;
                measure.Shoulders = values[BodyPartType.Shoulders] ?? measure.Shoulders;
                measure.Neck = values[BodyPartType.Neck] ?? measure.Neck;
                measure.Chest = values[BodyPartType.Chest] ?? measure.Chest;
                measure.LeftArm = values[BodyPartType.LeftArm] ?? measure.LeftArm;
                measure.RightArm = values[BodyPartType.RightArm] ?? measure.RightArm;
                measure.LeftForearm = values[BodyPartType.LeftForearm] ?? measure.LeftForearm;
                measure.RightForearm = values[BodyPartType.RightForearm] ?? measure.RightForearm;
                measure.Waist = values[BodyPartType.Waist] ?? measure.Waist;
                measure.Wrist = values[BodyPartType.Wrist] ?? measure.Wrist;
                measure.Hips = values[BodyPartType.Hips] ?? measure.Hips;
                measure.LeftThigh = values[BodyPartType.LeftThigh] ?? measure.LeftThigh;
                measure.RightThigh = values[BodyPartType.RightThigh] ?? measure.RightThigh;
                measure.LeftCalf = values[BodyPartType.LeftCalf] ?? measure.LeftCalf;
                measure.RightCalf = values[BodyPartType.RightCalf] ?? measure.RightCalf;
                measure.Ankle = values[BodyPartType.Ankle] ?? measure.Ankle;
            }
            else
            {
                measure = new Measurement
                {
                    Id = Guid.NewGuid().ToString(),
                    DateOfMeasurment = dateOfMeasurement,
                    Weight = values[BodyPartType.Weight],
                    Height = values[BodyPartType.Height],
                    Fats = values[BodyPartType.Fats],
                    Shoulders = values[BodyPartType.Shoulders],
                    Neck = values[BodyPartType.Neck],
                    Chest = values[BodyPartType.Chest],
                    LeftArm = values[BodyPartType.LeftArm],
                    RightArm = values[BodyPartType.RightArm],
                    LeftForearm = values[BodyPartType.LeftForearm],
                    RightForearm = values[BodyPartType.RightForearm],
                    Waist = values[BodyPartType.Waist],
                    Wrist = values[BodyPartType.Wrist],
                    Hips = values[BodyPartType.Hips],
                    LeftThigh = values[BodyPartType.LeftThigh],
                    RightThigh = values[BodyPartType.RightThigh],
                    LeftCalf = values[BodyPartType.LeftCalf],
                    RightCalf = values[BodyPartType.RightCalf],
                    Ankle = values[BodyPartType.Ankle],
                    ApplicationUserId = userId,
                };

                await this.measurementRepo.AddAsync(measure);
            }
           
            return await this.measurementRepo.SaveChangesAsync();
        }

        public async Task<string> EditMeasurement(string measurementId,EditMeasurementModel model)
        {
            DateTime dateOfMeasurement;
            if(!DateTime.TryParse(model.DateOfMeasurement,out dateOfMeasurement))
            {
                throw new ArgumentException();
            }


            var measure = await this.measurementRepo
                .All()
                .Where(m => m.Id == measurementId)
                .FirstOrDefaultAsync();

            //Indexistant
            if (measure == null)
            {
                throw new ArgumentException();
            }
            //Can't change the day
            if (measure.DateOfMeasurment != dateOfMeasurement)
            {
                throw new ArgumentException();
            }

            var values = this.bodyService.GetParsedValues(model);

            measure.Weight = values[BodyPartType.Weight] ?? measure.Weight;
            measure.Height = values[BodyPartType.Height] ?? measure.Height;
            measure.Fats = values[BodyPartType.Fats] ?? measure.Fats;
            measure.Shoulders = values[BodyPartType.Shoulders] ?? measure.Shoulders;
            measure.Neck = values[BodyPartType.Neck] ?? measure.Neck;
            measure.Chest = values[BodyPartType.Chest] ?? measure.Chest;
            measure.LeftArm = values[BodyPartType.LeftArm] ?? measure.LeftArm;
            measure.RightArm = values[BodyPartType.RightArm] ?? measure.RightArm;
            measure.LeftForearm = values[BodyPartType.LeftForearm] ?? measure.LeftForearm;
            measure.RightForearm = values[BodyPartType.RightForearm] ?? measure.RightForearm;
            measure.Waist = values[BodyPartType.Waist] ?? measure.Waist;
            measure.Wrist = values[BodyPartType.Wrist] ?? measure.Wrist;
            measure.Hips = values[BodyPartType.Hips] ?? measure.Hips;
            measure.LeftThigh = values[BodyPartType.LeftThigh] ?? measure.LeftThigh;
            measure.RightThigh = values[BodyPartType.RightThigh] ?? measure.RightThigh;
            measure.LeftCalf = values[BodyPartType.LeftCalf] ?? measure.LeftCalf;
            measure.RightCalf = values[BodyPartType.RightCalf] ?? measure.RightCalf;
            measure.Ankle = values[BodyPartType.Ankle] ?? measure.Ankle;

            this.measurementRepo.Update(measure);
            await this.measurementRepo.SaveChangesAsync();

            return measure.Id;
        }

        public async Task<IEnumerable<MeasurementModel>> LoadMeasurements(string userId)
        {
            var measurements = await measurementRepo
                .All()
                .Where(m => m.ApplicationUserId == userId)
                .OrderBy(m => m.DateOfMeasurment)
                .Select(m => new MeasurementModel
                {
                    Id = m.Id,
                    DateOfMeasurement = m.DateOfMeasurment.ToString("dd/MM/yyyy"),
                    Weight = m.Weight,
                    Height = m.Height,
                    Neck = m.Neck,
                    Shoulders = m.Shoulders,
                    Chest = m.Chest,
                    LeftArm = m.LeftArm,
                    RightArm = m.RightArm,
                    LeftForearm = m.LeftForearm,
                    RightForearm = m.RightForearm,
                    Wrist = m.Wrist,
                    Fats = m.Fats,
                    Waist = m.Waist,
                    Hips = m.Hips,
                    LeftThigh = m.LeftThigh,
                    RightThigh = m.RightThigh,
                    LeftCalf = m.LeftCalf,
                    RightCalf = m.RightCalf,
                    Ankle = m.Ankle,
                })
                .ToListAsync();

            return measurements;
        }

        public async Task DeleteMeasurement(string measurementId)
        {
            var measurement = await this.measurementRepo
                .All()
                .Where(m => m.Id == measurementId)
                .FirstOrDefaultAsync();

            this.measurementRepo.Delete(measurement);
            await this.measurementRepo.SaveChangesAsync();
        }

        public async Task<MeasurementModel> LoadMeasurementById(string measurementId)
        {
            var measurement = await this.measurementRepo
                .All()
                .Where(m => m.Id == measurementId)
                .ProjectTo<MeasurementModel>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return measurement;
        }
    }
}
