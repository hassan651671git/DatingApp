using System;
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
    [Route("users/{userId}/[controller]")]
    [ServiceFilter(typeof(LogUserActivity))]
     [ApiController]
    public class MessagesController:ControllerBase
    {
        private IDatingRepository _repo ;
        private IMapper _mapper; 
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }



        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId,[FromBody]MessageForCreationDto messageForCreationDto)
        {
           
          
              int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              messageForCreationDto.SenderId=id;
              var recipient=await _repo.GetUser(messageForCreationDto.RecipientId);
              if(recipient==null)
              return BadRequest("user you try to send to it is not found");
             var message= _mapper.Map<Message>(messageForCreationDto);  
             _repo.Add(message);
              
             if(await _repo.SaveAll()){
                 var messageFromRepo=await _repo.GetMessage(message.Id);
                var messageForReturnDto= _mapper.Map<MessageForReturnDto>(messageFromRepo);
                 return Ok(messageForReturnDto);
             }

             return BadRequest("can't save your message"); 

        }
        [HttpDelete("{messageId}")]
        public async Task<IActionResult> DeleteMessage(int userId,int messageId)
        {
              int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              if(id!=userId)
              return Unauthorized();
              var messageFromRepo=await _repo.GetMessage(messageId);
              
              if(messageFromRepo.RecipientId==userId)
              {
                  messageFromRepo.RecipientDeleted=true;
              }
               else if(messageFromRepo.SenderId==userId)
              {
                  messageFromRepo.SenderDeleted=true;
              }
              else
              {
                 return Unauthorized("you havn't uthorization to access this message");
              }
              if(messageFromRepo.SenderDeleted&&messageFromRepo.RecipientDeleted)
              { 
                 _repo.Delete(messageFromRepo);
              }
              if(await _repo.SaveAll())
              {
                return NoContent();
              }
              return BadRequest("can't delete this message");



        }
              

        [HttpGet]
        public async Task<IActionResult> GetUserMessages(int userId,[FromQuery]MessagesParams messagesParams)
        {
              int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              if(id!=userId)
              return Unauthorized();
              
              messagesParams.UserId=id;
              var messagesFromRepo=await _repo.GetMessagesForUser(messagesParams);
              var messageForReturnDto=_mapper.Map<IEnumerable<MessageForReturnDto>>(messagesFromRepo);
              PaginationHeader paginationHeader=
              new PaginationHeader(messagesFromRepo.CurrentPage,messagesFromRepo.TotalCount,
                                   messagesFromRepo.TotalPages,messagesFromRepo.PageSize);
              Response.AddPagination(paginationHeader);
              return Ok(messageForReturnDto);

        }


        [HttpGet("{recipientId}")]
        public async Task<IActionResult> GetMessagesThread(int userId,int recipientId)
        {
              int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              if(id!=userId)
              return Unauthorized();
              
              
              var messagesFromRepo=await _repo.GetMessageThread(userId,recipientId);
              var messageForReturnDto=_mapper.Map<IEnumerable<MessageForReturnDto>>(messagesFromRepo);
              PaginationHeader paginationHeader=
              new PaginationHeader(messagesFromRepo.CurrentPage,messagesFromRepo.TotalCount,
                                   messagesFromRepo.TotalPages,messagesFromRepo.PageSize);
              Response.AddPagination(paginationHeader);
              return Ok(messageForReturnDto);

        }

        [HttpPost("{messageId}/read")]
        public async Task<IActionResult>MarkMessageAsRead(int userId,int messageId)
        {
               int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              if(id!=userId)
              return Unauthorized();

              var message=await _repo.GetMessage(messageId);
              if(message.RecipientId!=userId)
              {
                 return Unauthorized();
              }

              message.IsRead=true;
              message.DateRead=DateTime.Now;
              await _repo.SaveAll();
              return NoContent();

        }


    }
}