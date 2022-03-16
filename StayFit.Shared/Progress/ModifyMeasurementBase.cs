using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared.Progress
{
    public abstract class ModifyMeasurementBase
    {
        [Required]
        public string DateOfMeasurement { get; set; }

        public string Height { get; set; }

        public string Weight { get; set; }

        public string Fats { get; set; }

        public string Neck { get; set; }

        public string Shoulders { get; set; }

        public string Chest { get; set; }

        public string LeftArm { get; set; }

        public string RightArm { get; set; }

        public string LeftForearm { get; set; }

        public string RightForearm { get; set; }

        public string Waist { get; set; }

        public string Wrist { get; set; }

        public string Hips { get; set; }

        public string LeftThigh { get; set; }

        public string RightThigh { get; set; }

        public string LeftCalf { get; set; }

        public string RightCalf { get; set; }

        public string Ankle { get; set; }
    }
}
