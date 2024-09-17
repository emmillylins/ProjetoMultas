using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Validators;
using Infrastructure.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MultaController : MainController
    {
        private readonly IMultaService _service;
        private readonly IMapper _mapper;
        public MultaController(INotificador notificador, IMultaService service, IMapper mapper) : base(notificador)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Listar()
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);
                return CustomResponse(await _service.GetAsync<MultaDto>());
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Obter(Guid id)
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);
                return CustomResponse(await _service.GetAsync<MultaDto>(id));
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Excluir(Guid id)
        {
            try
            {
                _service.Delete(id);
                return CustomResponse();
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Inserir(CreateMultaDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);
                var result = await _service.InsertAsync<CreateMultaDto, MultaDto, MultaValidator>(dto);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [HttpPut]
        public async Task<ActionResult> Atualizar(MultaDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);
                var result = _service.Update<MultaDto, MultaDto, MultaValidator>(dto);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }
    }
}
