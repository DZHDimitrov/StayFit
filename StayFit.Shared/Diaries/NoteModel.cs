namespace StayFit.Shared.Diaries
{
    public class NoteModel
    {
        public int Id { get; set; }

        public string Mood { get; set; }

        public string Activity { get; set; }

        public string Nutrition { get; set; }

        public string Other { get; set; }

        public string SleepHours { get; set; }

        public bool IsModified { get; set; } = false;

        public bool IsActive { get; set; }

        public string CreatedOn { get; set; }
    }
}
