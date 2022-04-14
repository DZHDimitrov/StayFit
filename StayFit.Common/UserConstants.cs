namespace StayFit.Common
{
    public static class UserConstants
    {
        public static class Roles
        {
            public const string Administrator = "Administrator";
            public const string Moderator = "Moderator";
        }

        public static class Constraints
        {
            public const int UsernameMinLength = 4;
            public const int UsernameMaxLength = 50;

            public const int FirstNameMinLength = 2;
            public const int FirstNameMaxLength = 40;

            public const int LastNameMinLength = 2;
            public const int LastNameMaxLength = 40;

            public const int GenderMaxLength = 10;
        }
    }
}
