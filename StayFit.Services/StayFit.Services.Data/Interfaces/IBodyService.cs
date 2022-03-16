using StayFit.Shared.Enums;
using StayFit.Shared.Progress;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IBodyService
    {
        public void ParseBodyPart(string value, ref double? parsedValue);

        public Dictionary<BodyPartType, double?> GetParsedValues(ModifyMeasurementBase model);
    }
}
