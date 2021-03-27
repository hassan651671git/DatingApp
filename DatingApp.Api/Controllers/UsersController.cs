using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
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

          [HttpGet("{id}")]
        public async Task<IActionResult>getUser(int id){
            var user= await _datingRepository.GetUser(id);
            UserForDetailedDto userModel=_mapper.Map<UserForDetailedDto>(user);
            return  Ok(userModel);
        }


    }
}