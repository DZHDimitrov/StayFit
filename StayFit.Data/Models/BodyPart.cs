namespace StayFit.Data.Models
{
    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.ReadingModels;
    using System.Collections.Generic;

    public class BodyPart : BaseDeletableModel<int>
    {
        public BodyPart()
        {
            this.Articles = new HashSet<Reading>();   
        }

        public string SearchName { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Reading> Articles { get; set; }
    }
}
