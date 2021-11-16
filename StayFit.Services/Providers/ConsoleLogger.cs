using StayFit.Services.Providers.Interfaces;
using System;
using System.Globalization;

namespace StayFit.Services.Providers
{
    public class ConsoleLogger : ILogger
    {
        public string Date => DateTime.UtcNow.ToString("MM/dd/yy hh:mm",CultureInfo.InvariantCulture);
        public void Log(string controllerName,string path,string method)
        {
            Console.WriteLine($"{controllerName} {path} at {Date} ON HTTP {method}");
        }
    }
}
