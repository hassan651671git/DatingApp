using System;

namespace DatingApp.Api.DTOs
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        
         public String Gender { get; set; }
         public int age { get; set; }
        public string KnowAs { get; set; }
         public DateTime Created { get; set; }
         public DateTime LastActive { get; set; }
          public String  City { get; set; }
         public string Country { get; set; } 
          public string PhotoUrl { get; set; } 
    }
}