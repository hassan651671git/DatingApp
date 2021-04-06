using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T:class ;
         void Delete<T>(T entity) where T:class ;

         Task<bool>SaveAll();
         Task<User>GetUser(int id);
         Task<PagedList<User>>GetUsers(UserParams userParams);

         Task<Photo>GetPhoto(int id);

         Task<Like>GetLike(int likerId,int LikeeId);
         Task<Message>GetMessage(int id);
         Task<PagedList<Message>>GetMessagesForUser(MessagesParams messagesParams);
         Task<PagedList<Message>>GetMessageThread(int userID,int recipientID);

         
    }
}