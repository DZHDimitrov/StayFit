namespace StayFit.Shared
{

    using Newtonsoft.Json;

    public class ErrorModel
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
