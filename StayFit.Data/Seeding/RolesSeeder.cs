using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using StayFit.Common;
using StayFit.Data.Models;
using System;
using System.Linq;

namespace StayFit.Data.Seeding
{
    public class RolesSeeder : ISeeder
    {
        public void Seed(AppDbContext dbContext, IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            SeedRole(roleManager, UserConstants.Roles.Administrator);
            SeedRole(roleManager, UserConstants.Roles.Moderator);
        }

        private static void SeedRole(RoleManager<ApplicationRole> roleManager, string roleName)
        {
            var role = roleManager.FindByNameAsync(roleName).GetAwaiter().GetResult();

            if (role == null)
            {
                var result = roleManager.CreateAsync(new ApplicationRole(roleName)).GetAwaiter().GetResult();

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
