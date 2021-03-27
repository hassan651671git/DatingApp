using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T:class ;
         void Delete<T>(T entity) where T:class ;

         Task<bool>SaveAll();
         Task<User>GetUser(int id);
         Task<IEnumerable<User>>GetUsers();
         
    }
}