namespace StayFit.Shared.Diaries
{

    using System.ComponentModel.DataAnnotations;

    public class CreateNoteModel
    {
        public string Activity { get; set; }

        [Required]
        public string Mood { get; set; }

        public string Nutrition { get; set; }

        public string Other { get; set; }

        public string SleepHours { get; set; }
    }
}
