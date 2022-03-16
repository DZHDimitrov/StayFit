using StayFit.Shared.Progress;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IProgressService
    {
        public Task<int> CreateMeasurement(string userId,CreateMeasurementModel model);

        public Task<MeasurementModel> LoadMeasurementById(string measurementId);

        public Task DeleteMeasurement(string measurementId);

        public Task<string> EditMeasurement(string measurementId,EditMeasurementModel model);

        public Task<IEnumerable<MeasurementModel>> LoadMeasurements(string userId);
    }
}
