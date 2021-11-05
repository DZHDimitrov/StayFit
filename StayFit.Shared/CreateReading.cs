using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StayFit.Shared
{
    public class CreateReading
    {
        public int MainGroupId { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public SubGroup SubGroup { get; set; }
    }
}
