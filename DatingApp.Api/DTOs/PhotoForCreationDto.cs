using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.Api.DTOs
{
    public class PhotoForCreationDto
    {

        public string Url { get; set; }
        public IFormFile File { get; set; }
        public String Description { get; set; }
        public DateTime DateAdded { get; set; }
        public String PublicId { get; set; }
        public PhotoForCreationDto()
        {
            DateAdded = new DateTime();
        }

    }
}