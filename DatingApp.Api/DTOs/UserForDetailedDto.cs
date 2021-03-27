using System;
using System.Collections.Generic;
using DatingApp.Api.Models;

namespace DatingApp.Api.DTOs
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
         public String Gender { get; set; }
         public int age { get; set; }
        public string KnowAs { get; set; }
         public DateTime Created { get; set; }
         public DateTime LastActive { get; set; }
         public string Introduction { get; set; }
         public String  LookingFor { get; set; }
         public string Interests { get; set; }
         public String  City { get; set; }
         public string Country { get; set; }
         public string PhotoUrl{get;set;}
         public  ICollection<PhotoForDetailedDto>Photos{get;set;}
    }
}