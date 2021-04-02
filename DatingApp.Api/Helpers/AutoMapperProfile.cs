using System;
using System.Linq;
using AutoMapper;
using DatingApp.Api.DTOs;
using DatingApp.Api.Models;

namespace DatingApp.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, option =>
            {
                option.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.age, option =>
            {
                option.MapFrom(src =>DateTime.Now.Year-src.DateOfBirth.Year);
            });

            CreateMap<UserForDetailedDto, User>();
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, option =>
            {
                option.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.age, option =>
            {
                option.MapFrom(src =>DateTime.Now.Year-src.DateOfBirth.Year);
            });
            CreateMap<UserForListDto, User>();
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<PhotoForDetailedDto, Photo>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<User,UserForUpdateDto>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();
             CreateMap<UserForRegisterDto,User>();
            
        }
    }
}