using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Data
{
    public class DatingRepository : IDatingRepository
    {
        public DataContext _context { get; set; }
        public DatingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
         return await  _context.Users.Include(User=>User.Photos).FirstOrDefaultAsync(User=>User.Id==id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
              return await  _context.Users.Include(User=>User.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync()>0;
        }
    }
}