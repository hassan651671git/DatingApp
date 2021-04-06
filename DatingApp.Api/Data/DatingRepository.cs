using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.EntityFrameworkCore;
using DatingApp.Api.Helpers;
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

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var querableUsers=  _context.Users.Include(User=>User.Photos).AsQueryable();
            querableUsers=querableUsers.Where(u=>u.Id!=userParams.UserId);
            querableUsers=querableUsers.Where(u=>u.Gender==userParams.Gender);
            var minDate=DateTime.Now.AddYears(-userParams.MaxAge);
            var maxDate=DateTime.Now.AddYears(-userParams.MinAge);
            querableUsers=querableUsers.Where(u=>u.DateOfBirth>=minDate&&u.DateOfBirth<=maxDate);   
            if(!String.IsNullOrEmpty(userParams.orderBy))
            {
                switch(userParams.orderBy)
                {
                    case "created":
                     querableUsers=querableUsers.OrderByDescending(u=>u.Id);
                    break;
                    default:
                      querableUsers=querableUsers.OrderByDescending(u=>u.LastActive);
                    break;              

                }
            }        
              
              if(userParams.Likers)
              {
                 var userLikers=await getUserLikers(userParams.UserId);
                 querableUsers=querableUsers.Where(u =>userLikers.Contains(u.Id));
              }
              if(userParams.Likees)
              {
                 var userLikees=await getUserLikees(userParams.UserId);
                 querableUsers=querableUsers.Where(u =>userLikees.Contains(u.Id));
              }




              return await  PagedList<User>.CreateAsync(querableUsers,userParams.PageNumber,userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync()>0;
        }

        public async  Task<Photo> GetPhoto(int id)
        {
             return await _context.Photos.FirstOrDefaultAsync(p=>p.Id==id);
        }

        public async Task<Like> GetLike(int likerId, int LikeeId)
        {
            return await _context.Likes.FirstOrDefaultAsync(l =>l.LikerId==likerId&&l.LikeeID==LikeeId);
        }


        private async Task<IEnumerable<int>>getUserLikees(int id)
        {
            var user=_context.Users.Include(u=>u.Likees).FirstOrDefault(u =>u.Id==id);
            return user.Likees.Select(l =>l.LikeeID);
 
        }

          private async Task<IEnumerable<int>>getUserLikers(int id)
        {
            var users=_context.Users.Include(u=>u.Likers).FirstOrDefault(u =>u.Id==id);
            return users.Likers.Select(l =>l.LikerId);

        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages
            .Include(m=>m.Sender)
            .ThenInclude(u =>u.Photos)
            .Include(m => m.Recipient)
            .ThenInclude(u =>u.Photos).FirstOrDefaultAsync(m=>m.Id==id );
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessagesParams messagesParams)
        {
            var messages=_context.Messages.Include(m=>m.Sender)
            .ThenInclude(u =>u.Photos)
            .Include(m => m.Recipient).ThenInclude(u =>u.Photos).AsQueryable();
            switch(messagesParams.MessageContainer)
            {
                case "inbox":
                messages=messages.Where(m =>m.RecipientId==messagesParams.UserId && m.RecipientDeleted==false);
                break;
                case "outbox":
                 messages=messages.Where(m =>m.SenderId==messagesParams.UserId&&m.SenderDeleted==false);
                break;
                default:
                    messages=messages.Where(m =>m.RecipientId==messagesParams.UserId && 
                            m.IsRead==false&&m.RecipientDeleted==false);
                break;

            }
        
            messages=messages.OrderByDescending(m =>m.MessageSent);
            return await PagedList<Message>.CreateAsync(messages,messagesParams.PageNumber,messagesParams.PageSize);
        }

        public async Task<PagedList<Message>> GetMessageThread(int userId, int recipientID)
        {
           var messages=_context.Messages.Include(m=>m.Sender)
            .ThenInclude(u =>u.Photos)
            .Include(m => m.Recipient).ThenInclude(u =>u.Photos).AsQueryable();
             messages=messages.
             Where(m =>(m.SenderId==userId && m.RecipientId==recipientID&&m.SenderDeleted==false) ||
                  (m.SenderId==recipientID && m.RecipientId==userId&&m.RecipientDeleted==false) );
            
            messages=messages.OrderByDescending(m =>m.MessageSent);
            return await PagedList<Message>.CreateAsync(messages,1,1000);
        }
    }
}