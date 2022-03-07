namespace StayFit.Data.Models
{
    using Microsoft.AspNetCore.Identity;

    using StayFit.Data.Common.Models;
    using StayFit.Data.Models.ConversationModels;
    using StayFit.Data.Models.DiaryModels;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ReadingModels;

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

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
            this.Messages = new HashSet<Message>();
            this.Readings = new HashSet<Reading>();
            this.RecievedMessages = new HashSet<Message>();
        }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string Gender { get; set; }

        public DateTime? BirthDate { get; set; }

        public string ImageUrl { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

        public ICollection<UserReading> UserReadings { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Vote> Votes { get; set; } 

        public ICollection<UsersChosenComments> ChosedComments { get; set; }

        [InverseProperty("Sender")]
        public ICollection<Message> Messages { get; set; }

        [InverseProperty("Receiver")]
        public ICollection<Message> RecievedMessages { get; set; }

        public ICollection<Reading> Readings { get; set; }

        public ICollection<Diary> Diaries { get; set; }
    }
}
