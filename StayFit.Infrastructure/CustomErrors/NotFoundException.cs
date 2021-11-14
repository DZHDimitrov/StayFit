namespace StayFit.Infrastructure.CustomErros
{

    using System;

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {

        }
    }
}
