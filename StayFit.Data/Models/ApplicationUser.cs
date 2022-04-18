namespace StayFit.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using StayFit.Common;
    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.DiaryModels;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ProgerssModels;
    using StayFit.Data.Models.ReadingModels;

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        [Required]
        [StringLength(UserConstants.Constraints.FirstNameMaxLength)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(UserConstants.Constraints.LastNameMaxLength)]
        public string LastName { get; set; }

        [Required]
        [StringLength(UserConstants.Constraints.GenderMaxLength)]
        public string Gender { get; set; }

        public DateTime? BirthDate { get; set; }

        public string ImageUrl { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; } = new HashSet<IdentityUserRole<string>>();

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; } = new HashSet<IdentityUserClaim<string>>();

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; } = new HashSet<IdentityUserLogin<string>>();

        public ICollection<UserReading> UserReadings { get; set; } = new HashSet<UserReading>();

        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();

        public ICollection<Post> Posts { get; set; } = new HashSet<Post>();

        public ICollection<Vote> Votes { get; set; } = new HashSet<Vote>();

        public ICollection<UsersChosenComments> ChosedComments { get; set; } = new HashSet<UsersChosenComments>();

        public ICollection<Reading> Readings { get; set; } = new HashSet<Reading>();

        public ICollection<Diary> Diaries { get; set; } = new HashSet<Diary>();

        public ICollection<Measurement> Measurements { get; set; } = new HashSet<Measurement>();
    }
}
