using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Api.Controllers
{
    [Route("[controller]")]
 
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IAuthRepository _authRepository { get; set; }
        public IConfiguration _configuration { get; set; }
        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _configuration = configuration;
            _authRepository = authRepository;

        }

        [HttpPost("register")]
        public async Task<IActionResult> register([FromBody] UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.userName = userForRegisterDto.userName.ToLower();

            if (await _authRepository.UserExists(userForRegisterDto.userName))
            {
                return BadRequest("user Already Taken");
            }
            User user = new User();
            user.UserName = userForRegisterDto.userName;
            User createdUser = await _authRepository.Register(user, userForRegisterDto.passWord);
            return StatusCode(201);

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto loginDetails)
        {

            User foundUser = await _authRepository.Login(loginDetails.UserName.ToLower(), loginDetails.PassWord);
            if (foundUser == null)
            {
                return Unauthorized("invalid username or password");
            }
            
            var claims = new[]{
            new Claim(ClaimTypes.NameIdentifier,foundUser.Id.ToString()),
            new Claim(ClaimTypes.Name,foundUser.UserName)

          };
            var key = new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler=new JwtSecurityTokenHandler();
           var token= tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new{
                token=tokenHandler.WriteToken(token)
            });

        }
    }
}