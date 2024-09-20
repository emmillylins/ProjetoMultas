using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace WebApi.Config
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<MultaDto, Multa>().ReverseMap();
            CreateMap<CreateMultaDto, Multa>().ReverseMap();
        }
    }
}
