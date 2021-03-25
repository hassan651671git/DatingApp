using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserForRegisterDto
{
    [Required]
    public string userName { get; set; }
    [Required]
    public string passWord { get; set; }
    
}
}