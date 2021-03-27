using System;

namespace DatingApp.Api.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public String Url { get; set; }
        public String Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsMain { get; set; }
        public int UserId{get;set;}
        public User User{get;set;}
    }
}