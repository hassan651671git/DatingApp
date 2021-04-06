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
        public DbSet<Photo> Photos{get;set;}
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Like>().HasKey(k=>new{k.LikeeID,k.LikerId});
            
            builder.Entity<Like>()
                .HasOne<User>(u=>u.Likee)
                .WithMany(l=>l.Likers)
                .HasForeignKey(l => l.LikeeID)
                .OnDelete(DeleteBehavior.Cascade);
                
            builder.Entity<Like>()
                .HasOne<User>(u=>u.Liker)
                .WithMany(l=>l.Likees)
                .HasForeignKey(l =>l.LikerId)
                .OnDelete(DeleteBehavior.Cascade);  

                builder.Entity<Message>()
                .HasOne<User>(m=>m.Sender)
                .WithMany(u=>u.MessagesSent)
                .OnDelete(DeleteBehavior.Cascade);  
                builder.Entity<Message>()
                .HasOne<User>(m=>m.Recipient)
                .WithMany(u=>u.MessagesReceived) 
                .OnDelete(DeleteBehavior.Cascade);    

        }
    }
}