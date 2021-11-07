using System;

namespace StayFit.Infrastructure
{
    public class TestException : Exception
    {
        public int StatusCode { get; set; }

        public override string Message => "Invalid test!";
    }
}
