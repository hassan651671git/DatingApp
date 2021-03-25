using System.Threading.Tasks;
using DatingApp.Api.DTOs;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public interface IAuthRepository
    {
       public Task<User>Register(User user,string password);
        public Task<User>Login(string userName,string pssword);

         public Task<bool>UserExists(string userName);
       
         
    }
}