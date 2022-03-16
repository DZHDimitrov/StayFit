using StayFit.Services.StayFit.Services.Data.Interfaces;
using StayFit.Shared.Enums;
using StayFit.Shared.Progress;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace StayFit.Services.StayFit.Services.Data
{
    public class BodyService : IBodyService
    {
        public Dictionary<BodyPartType, double?> GetParsedValues(ModifyMeasurementBase model)
        {
            double? weight = null;
            ParseBodyPart(model.Weight, ref weight);

            double? height = null;
            ParseBodyPart(model.Height, ref height);

            double? fats = null;
            ParseBodyPart(model.Fats, ref fats);

            double? neck = null;
            ParseBodyPart(model.Neck, ref neck);

            double? shoulders = null;
            ParseBodyPart(model.Shoulders, ref shoulders);

            double? chest = null;
            ParseBodyPart(model.Chest, ref chest);

            double? leftArm = null;
            ParseBodyPart(model.LeftArm, ref leftArm);

            double? rightArm = null;
            ParseBodyPart(model.RightArm, ref rightArm);

            double? leftForearm = null;
            ParseBodyPart(model.LeftForearm, ref leftForearm);

            double? rightForearm = null;
            ParseBodyPart(model.RightForearm, ref rightForearm);

            double? waist = null;
            ParseBodyPart(model.Waist, ref waist);

            double? wrist = null;
            ParseBodyPart(model.Wrist, ref wrist);

            double? hips = null;
            ParseBodyPart(model.Hips, ref hips);

            double? leftThigh = null;
            ParseBodyPart(model.LeftThigh, ref leftThigh);

            double? rightThigh = null;
            ParseBodyPart(model.RightThigh, ref rightThigh);

            double? leftCalf = null;
            ParseBodyPart(model.LeftCalf, ref leftCalf);

            double? rightCalf = null;
            ParseBodyPart(model.RightCalf, ref rightCalf);

            double? ankle = null;
            ParseBodyPart(model.Ankle, ref ankle);

            var values = new Dictionary<BodyPartType, double?>()
            {
                [BodyPartType.Weight] = weight,
                [BodyPartType.Height] = height,
                [BodyPartType.Fats] = fats,
                [BodyPartType.Neck] = weight,
                [BodyPartType.Shoulders] = weight,
                [BodyPartType.Chest] = chest,
                [BodyPartType.LeftArm] = leftArm,
                [BodyPartType.RightArm] = rightArm,
                [BodyPartType.LeftForearm] = leftForearm,
                [BodyPartType.RightForearm] = rightForearm,
                [BodyPartType.Waist] = waist,
                [BodyPartType.Wrist] = wrist,
                [BodyPartType.Hips] = hips,
                [BodyPartType.LeftThigh] = leftThigh,
                [BodyPartType.RightThigh] = rightThigh,
                [BodyPartType.LeftCalf] = leftCalf,
                [BodyPartType.RightCalf] = rightCalf,
                [BodyPartType.Ankle] = ankle,
            };

            return values;
        }

        public void ParseBodyPart(string value, ref double? parsedValue)
        {
            double valueToParse = -1;

            if (double.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out valueToParse))
            {
                parsedValue = valueToParse;
            }
            else
            {
                parsedValue = null;
            }
        }
    }
}
