using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Api.Controllers
{
    [Authorize]
    [Route("users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Account account;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repository = repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;


            account = new Account()
            {
                ApiKey = _cloudinaryConfig.Value.ApiKey,
                ApiSecret = _cloudinaryConfig.Value.ApiSecret,
                Cloud = _cloudinaryConfig.Value.CloudName
            };
            _cloudinary = new Cloudinary(account);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repository.GetPhoto(id);
            var returnedPhoto = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(returnedPhoto);

        }



        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var userFromRepo = await _repository.GetUser(userId);
            var file = photoForCreationDto.File;
            var uploadedResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500)
                      .Crop("fill").Gravity("face"),
                    };
                    uploadedResult = _cloudinary.Upload(uploadParams);

                }
            }
            photoForCreationDto.Url = uploadedResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadedResult.PublicId;
            var photo = _mapper.Map<Photo>(photoForCreationDto);
            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }
            userFromRepo.Photos.Add(photo);

            if (await _repository.SaveAll())
            {
                var photoForReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return Ok(photoForReturn);

                // return CreatedAtAction("GetPhoto",new { id=photo.Id},photoForReturn);
            }

            return BadRequest("couldn't add the photo");

        }

        [HttpPut("{id}/setmain")]
        public async Task<IActionResult> setMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _repository.GetUser(userId);

            var photoFromRepo = user.Photos.FirstOrDefault(p => p.Id == id);
            if (photoFromRepo == null)
            {
                return Unauthorized();
            }
            if (photoFromRepo.IsMain)
            {
                return BadRequest("photo is already main");
            }
            var mainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);

            if (mainPhoto != null)
            {
                mainPhoto.IsMain = false;
            }
            photoFromRepo.IsMain = true;

            if (await _repository.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("coludent set photo to main");



        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repository.GetPhoto(id);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("can't delete main photo");
            }

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);
                if (_cloudinary.Destroy(deleteParams).Result != "ok")
                {
                    return BadRequest("can't delete photo from cloudinary");

                }

            }
            
             _repository.Delete(photoFromRepo);


            if (await _repository.SaveAll())
            {
                return Ok();
            }

            return BadRequest("can't delete photo");

        }


    }
}