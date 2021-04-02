using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "username is required")]
        public string userName { get; set; }
        [Required]
        public string Gender { get; set; }
           [Required]
        public string KnowAs { get; set; }
           [Required]
        public DateTime DateOfBirth { get; set; }
           [Required]
        public string City { get; set; }
           [Required]
        public string Country { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime Created { get; set; }

        [Required(ErrorMessage = "password is required")]
        [MinLength(4, ErrorMessage = "min char for pass is 3")]
        public string passWord { get; set; }

        public UserForRegisterDto(){
            Created=DateTime.Now;
            LastActive=DateTime.Now;
        }

    }
}