namespace StayFit.Data.Models.DiaryModels
{
    using StayFit.Data.Common.Models;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Diary : BaseModel<int>
    {
        public Diary()
        {
            this.Notes = new HashSet<Note>();
        }

        [Required]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<Note> Notes { get; set; }
    }
}
