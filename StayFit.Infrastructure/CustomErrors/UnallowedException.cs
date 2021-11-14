namespace StayFit.Infrastructure.CustomErros
{

    using System;

    public class UnallowedException : Exception
    {
        public UnallowedException(string message) : base(message)
        {

        }
    }
}
