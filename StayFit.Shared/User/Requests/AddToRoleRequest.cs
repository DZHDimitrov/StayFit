namespace StayFit.Shared.Requests.User
{
    public class AddToRoleRequest
    {
        public string UserId { get; set; }

        public bool ToAdd { get; set; } = false;
    }
}
