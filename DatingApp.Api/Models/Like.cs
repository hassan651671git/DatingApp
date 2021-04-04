namespace DatingApp.Api.Models
{
    public class Like
    {
        public int LikeeID{get;set;}
        public User   Likee { get; set; }
        public int LikerId { get; set; }
        public User Liker { get; set; }
    }
}