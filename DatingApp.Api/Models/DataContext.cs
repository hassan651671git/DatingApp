using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<ValuesModel> Values { get; set; }
        public DbSet<User> Users { get; set; }
    }
}