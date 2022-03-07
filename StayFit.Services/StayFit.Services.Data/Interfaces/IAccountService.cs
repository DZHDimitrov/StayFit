using System.Threading.Tasks;

namespace StayFit.Services.StayFit.Services.Data.Interfaces
{
    public interface IAccountService
    {
        public Task<bool> Check(string userId,string type);
    }
}
