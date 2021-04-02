using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ServiceFilter(typeof(LogUserActivity))]
    public class UsersController : ControllerBase

    {
        IDatingRepository _datingRepository;
        IMapper _mapper;
        public UsersController(IDatingRepository datingRepository,IMapper mapper)
        {
            _datingRepository = datingRepository; 
            _mapper=mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult>getUsers(){
            var users= await _datingRepository.GetUsers();
            IEnumerable<UserForListDto>usersFolListDto=_mapper.Map<IEnumerable<UserForListDto>>(users);
            return  Ok(usersFolListDto);
        }

          [HttpGet("{id}",Name="GetUser")]
        public async Task<IActionResult>getUser(int id){
            var user= await _datingRepository.GetUser(id);
            UserForDetailedDto userModel=_mapper.Map<UserForDetailedDto>(user);
            return  Ok(userModel);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult>Update(int id,[FromBody]UserForUpdateDto updatedUserModel)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

                 User userFromRepo= await _datingRepository.GetUser(id);
                _mapper.Map(updatedUserModel,userFromRepo);
              if(await _datingRepository.SaveAll()){
                  return NoContent();
              }
                
           return BadRequest( );
         //throw new System.Exception("failed to save updated user");
 

        }


    }
}