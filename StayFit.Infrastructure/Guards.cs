using StayFit.Common;
using System;

namespace StayFit.Infrastructure
{
    public static class Guards
    {
        public static void AgainstNull(object obj,string message)
        {
            if (obj == null)
            {
                throw new NullReferenceException(string.Format(GlobalConstants.Errors.ITEM_NOT_FOUND,message));
            }
        }
    }
}
