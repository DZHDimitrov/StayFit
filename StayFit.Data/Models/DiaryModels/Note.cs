namespace StayFit.Data.Models.DiaryModels
{
    using StayFit.Common;
    using StayFit.Data.Common.Models;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Note : BaseModel<int>
    {
        [StringLength(DiaryConstants.Constraints.MoodMaxLength)]
        public string Mood { get; set; }

        [StringLength(DiaryConstants.Constraints.ActivityMaxLength)]
        public string Activity { get; set; }

        [StringLength(DiaryConstants.Constraints.NutritionMaxLength)]
        public string Nutrition { get; set; }

        [StringLength(DiaryConstants.Constraints.OtherMaxLength)]
        public string Other { get; set; }

        [Range(DiaryConstants.Constraints.MinSleepHours,DiaryConstants.Constraints.MaxSleepHours)]
        public double? SleepHours { get; set; }

        [ForeignKey(nameof(Diary))]
        public int DiaryId { get; set; }

        public Diary Diary { get; set; }
    }
}
