namespace StayFit.Services.Providers.Interfaces
{
    public interface ILogger
    {
        public void Log(string controllerName,string method,string path);
    }
}
