using StayFit.Services.StayFit.Services.Data.Interfaces;

using System;

namespace StayFit.Services.StayFit.Services.Data
{
    public class FormatService : IFormatService
    {
        public string ReplaceDelimiter(string oldDelimiter,string newDelimiter,string word)
        {
            return string.Join(newDelimiter, word.Split(oldDelimiter,StringSplitOptions.RemoveEmptyEntries)).ToLower();
        }
    }
}
