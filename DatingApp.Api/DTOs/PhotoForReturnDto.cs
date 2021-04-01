using System;

namespace DatingApp.Api.DTOs
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public String PublicId { get; set; }
        public String Url { get; set; }
        public String Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsMain { get; set; }

    }
}