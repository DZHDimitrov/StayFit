namespace StayFit.Infrastructure.CustomErros
{

    using System;

    public class InvalidRequestException : Exception
    {

        public InvalidRequestException(string message) : base(message)
        {

        }
    }
}
