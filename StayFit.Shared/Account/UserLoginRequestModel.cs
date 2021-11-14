namespace StayFit.Shared.Account
{

    using System.ComponentModel.DataAnnotations;

    public class UserLoginRequestModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
       
    }
}
