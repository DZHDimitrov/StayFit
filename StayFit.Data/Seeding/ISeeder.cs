using System;

namespace StayFit.Data.Seeding
{
    public interface ISeeder
    {
        void Seed(AppDbContext dbContext, IServiceProvider serviceProvider);
    }
}
