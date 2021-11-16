namespace StayFit.Data
{

    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    using StayFit.Data.Models;
    using StayFit.Data.Models.ConversationModels;
    using StayFit.Data.Models.FoodModels;
    using StayFit.Data.Models.FoodModels.Nutrients;
    using StayFit.Data.Models.Forum;
    using StayFit.Data.Models.ReadingModels;

    public class AppDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {
        public AppDbContext()
        {}

        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {}

        public DbSet<Reading> Readings { get; set; }

        public DbSet<ReadingMainCategory> ReadingMainCategories { get; set; }

        public DbSet<ReadingSubCategory> ReadingSubCategories { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<BaseNutrient> BaseNutrients { get; set; }

        public DbSet<SubNutrient> SubNutrients { get; set; }

        public DbSet<FoodSubNutrient> FoodSubNutrients { get; set; }

        public DbSet<FoodCategory> FoodCategories { get; set; }

        public DbSet<FoodBaseNutrient> FoodBaseNutrients { get; set; }

        public DbSet<UserReading> UserReadings { get; set; }

        public DbSet<FoodName> FoodNames { get; set; }

        public DbSet<BodyPart> BodyParts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostMainCategory> PostMainCategories { get; set; }

        public DbSet<PostSubCategory> PostSubCategories { get; set; }

        public DbSet<Vote> Votes { get; set; }

        public DbSet<UsersChosenComments> UserChosenComments { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=StayFit;Trusted_Connection=True;MultipleActiveResultSets=true");
            //base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<FoodBaseNutrient>().HasKey(c => new { c.FoodId, c.BaseNutrientId });
            builder.Entity<FoodSubNutrient>().HasKey(c => new { c.FoodId, c.SubNutrientId });
            builder.Entity<UsersChosenComments>().HasKey(c => new { c.ApplicationUserId, c.CommentId });
            builder.Entity<Message>().HasOne(c => c.Sender).WithMany(c => c.Messages).HasForeignKey(c => c.SenderId);
            builder.Entity<Message>().HasOne(c => c.Receiver).WithMany(c => c.RecievedMessages).HasForeignKey(c => c.ReceieverId);

            base.OnModelCreating(builder);
        }
    }
    
}
