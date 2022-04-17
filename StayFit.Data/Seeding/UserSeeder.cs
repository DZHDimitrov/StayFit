using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using StayFit.Common;
using StayFit.Data.Models;
using System;
using System.Linq;

namespace StayFit.Data.Seeding
{
    internal class UserSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            SeedAdmin(userManager, "@Super");
        }

        private static void SeedAdmin(UserManager<ApplicationUser> userManager,string username)
        {
            var user = userManager.FindByNameAsync(username).GetAwaiter().GetResult();

            if (user == null)
            {
                var newUser = new ApplicationUser()
                {
                    FirstName = "Daniel",
                    LastName = "Dimitrov",
                    Email = "someemail@abv.bg",
                    Gender = "male",
                    UserName = username,
                };

                var password = "123456789";

                var resultUser = userManager.CreateAsync(newUser,password).GetAwaiter().GetResult();

                if (!resultUser.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, resultUser.Errors.Select(e => e.Description)));
                }

                var resultRole = userManager.AddToRoleAsync(newUser, UserConstants.Roles.Administrator).GetAwaiter().GetResult();

                if (!resultRole.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, resultRole.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
