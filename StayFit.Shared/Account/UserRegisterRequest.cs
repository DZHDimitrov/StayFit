namespace StayFit.Shared.Account
{

    using System.ComponentModel.DataAnnotations;

    public class UserRegisterRequest
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [MinLength(6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare(nameof(Password))]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}
