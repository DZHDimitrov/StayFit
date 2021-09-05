using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared
{

    public class ApiError
    {
        public ApiError()
        {
        }

        public ApiError(string item, string error)
        {
            this.Item = item;
            this.Error = error;
        }

        public string Item { get; set; }

        public string Error { get; set; }

        public override string ToString()
        {
            return $"{this.Item}: {this.Error}";
        }
    }
}
