using System;

namespace DatingApp.Api.DTOs
{
    public class MessageForReturnDto
    {
        
       public int Id { get; set; } 
        public int SenderId { get; set; }   
        public String SenderKnowAs { get; set; }  
        public string SenderPhotoUrl{get;set;}  
        public int RecipientId { get; set; }
        public String RecipientKnowAs { get; set; }
        public String RecipientPhotoUrl { get; set; }
        public String Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
         

    }
}