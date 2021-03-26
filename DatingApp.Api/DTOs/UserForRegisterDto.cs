using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserForRegisterDto
{
    [Required]
    public string userName { get; set; }
    [Required]
    [MinLength(3,ErrorMessage="min char for pass is 3" )]
    public string passWord { get; set; }
    
}
}