namespace StayFit.Shared.Account
{
    using StayFit.Common;
    using System.ComponentModel.DataAnnotations;

    public class UserRegisterRequestModel
    {
        [Required]
        [StringLength(UserConstants.Constraints.FirstNameMaxLength, MinimumLength = UserConstants.Constraints.FirstNameMinLength)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(UserConstants.Constraints.LastNameMaxLength, MinimumLength = UserConstants.Constraints.LastNameMinLength)]
        public string LastName { get; set; }

        [Required]
        [StringLength(UserConstants.Constraints.UsernameMaxLength,MinimumLength = UserConstants.Constraints.UsernameMinLength)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password",ErrorMessage = "Password and confirm password do not match")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}
