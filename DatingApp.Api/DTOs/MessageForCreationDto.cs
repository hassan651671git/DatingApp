using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class MessageForCreationDto
    {


        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        [Required]
        [MaxLength(300,ErrorMessage = "maximum length is 300 char")]        
        public String Content { get; set; }
        public DateTime MessageSent { get; set; }
        public MessageForCreationDto()
        {
            MessageSent = DateTime.Now;
        }

    }
}