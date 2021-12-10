using System.Collections.Generic;

namespace StayFit.Shared.Readings
{
    public class LatestCategoryReadings
    {
        public LatestCategoryReadings()
        {
            this.Readings = new List<LatestReading>();
        }

        public ICollection<LatestReading> Readings { get; set; }

        public string Name { get; set; }

        public bool HasChildren { get; set; }
    }
}
