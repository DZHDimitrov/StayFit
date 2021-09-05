using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StayFit.Data.Models;

namespace StayFit.Data
{
   public class AppDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {

        public AppDbContext()
        {

        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
        }

        public DbSet<Artist> Artists { get; set; }

        public DbSet<Follower> Followers { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=StayFit;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
    
}
