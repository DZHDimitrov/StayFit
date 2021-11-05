namespace StayFit.Data
{

    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using StayFit.Data.Models;
    using StayFit.Data.Models.FoodModels;
    using StayFit.Data.Models;
    using StayFit.Data.Models.ReadingModels;
    using StayFit.Data.Models.FoodModels.Nutrients;

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=StayFit;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FoodBaseNutrient>().HasKey(c => new { c.FoodId, c.BaseNutrientId });
            builder.Entity<FoodSubNutrient>().HasKey(c => new { c.FoodId, c.SubNutrientId });
        }
    }
    
}
