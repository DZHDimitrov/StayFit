namespace StayFit.Common
{
    public static class DiaryConstants
    {
        public static class Errors
        {
            public const string AlreadyOwnsADiary = "Вече имате създаден дневник";

            public const string InvalidMoodType = "Настроение с тип {0} е невалдно";

            public const string InvalidDate = "{0} е невалидна дата";

            public const string InvalidHour = "{0} е невалиден час";

            public const string DiaryAlreadyFilled = "Този дневник вече има записки за {0}";
        }

        public static class Constraints
        {
            public const int MoodMaxLength = 20;

            public const int ActivityMaxLength = 200;

            public const int NutritionMaxLength = 200;

            public const int OtherMaxLength = 200;

            public const double MinSleepHours = 0;

            public const double MaxSleepHours = 24;
        }
    }
}
