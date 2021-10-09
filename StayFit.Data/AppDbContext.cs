using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StayFit.Data.Models;
using StayFit.Data.Models.NutritionModels.Nutrients;
using StayFit.Data.Models.NutritionModels.Nutrients.Many_To_Many;

namespace StayFit.Data
{
   public class AppDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {
        public AppDbContext()
        {}

        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {}

        public DbSet<Article> Articles { get; set; }

        public DbSet<NutritionCategory> NutritionCategories { get; set; }

        public DbSet<NutritionContent> NutritionPlans { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<VitaminType> VitaminTypes { get; set; }

        public DbSet<FoodVitamins> FoodVitamins { get; set; }

        public DbSet<CarbohydrateType> CarbohydrateTypes { get; set; }

        public DbSet<FoodCarbohydrates> FoodCarbohydrates { get; set; }

        public DbSet<MineralType> MineralTypes { get; set; }

        public DbSet<FoodMinerals> FoodMinerals { get; set; }

        public DbSet<MoreType> MoreTypes { get; set; }

        public DbSet<FoodMores> FoodMores { get; set; }

        public DbSet<SterolType> SterolTypes { get; set; }

        public DbSet<FoodSterols> FoodSterols { get; set; }

        public DbSet<AminoAcidsType> AminoAcidsTypes { get; set; }

        public DbSet<FoodAminoAcids> FoodAminoAcids { get; set; }

        public DbSet<FoodCategory> FoodCategories { get; set; }

        public DbSet<FoodFats> FoodFats { get; set; }

        public DbSet<TypeCategories> TypeCategories { get; set; }

        public DbSet<FatType> FatTypes { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=StayFit;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
    
}
