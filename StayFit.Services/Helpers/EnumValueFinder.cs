using StayFit.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace StayFit.Services.Helpers
{
    public static class EnumValueFinder
    {
        public static string GetDisplayValue<T>(T value)
        {
            var enumType = typeof(T);
            var membersInfo = enumType.GetMember(value.ToString());
            var enumValueMemberInfo = membersInfo.FirstOrDefault(m => m.DeclaringType == enumType);
            var valueAttributes = enumValueMemberInfo.GetCustomAttributes(typeof(DisplayAttribute), false);
            return ((DisplayAttribute)valueAttributes[0]).Name;
        }
    }
}
