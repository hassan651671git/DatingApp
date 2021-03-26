using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserForLoginDto
    {
        [Required(ErrorMessage="username is required")]
        public string UserName{get;set;}
        [Required(ErrorMessage="password is required")]
        public string PassWord{get;set;}
    }
}