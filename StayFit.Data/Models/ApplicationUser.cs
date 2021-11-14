namespace StayFit.Data.Models
{
    using Microsoft.AspNetCore.Identity;

    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ReadingModels;

    using System;
    using System.Collections.Generic;

    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>();
            this.UserReadings = new HashSet<UserReading>();
            this.Comments = new HashSet<Comment>();
            this.Posts = new HashSet<Post>();
            this.Votes = new HashSet<Vote>();
            this.ChosedComments = new HashSet<UsersChosenComments>();
        }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string Gender { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

        public ICollection<UserReading> UserReadings { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Vote> Votes { get; set; } 

        public ICollection<UsersChosenComments> ChosedComments { get; set; }
    }
}
