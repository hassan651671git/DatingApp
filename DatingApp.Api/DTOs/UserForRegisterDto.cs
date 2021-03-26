using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserForRegisterDto
{
    [Required(ErrorMessage="username is required")]
    public string userName { get; set; }
    [Required(ErrorMessage="password is required")]
    [MinLength(3,ErrorMessage="min char for pass is 3" )]
    public string passWord { get; set; }
    
}
}