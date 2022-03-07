namespace StayFit.Data.Models.DiaryModels
{
    using StayFit.Data.Common.Models;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Note : BaseModel<int>
    {
        public string Mood { get; set; }

        public string Activity { get; set; }

        public string Nutrition { get; set; }

        public string Other { get; set; }

        public double? SleepHours { get; set; }

        [ForeignKey(nameof(Diary))]
        public int DiaryId { get; set; }

        public Diary Diary { get; set; }
    }
}
