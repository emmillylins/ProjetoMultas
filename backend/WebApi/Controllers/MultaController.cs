using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Validators;
using Infrastructure.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/multas")]
    public class MultaController : MainController
    {
        private readonly IMultaService _service;
        private readonly IMapper _mapper;
        public MultaController(INotificador notificador, IMultaService service, IMapper mapper) : base(notificador)
        {
            _service = service;
            _mapper = mapper;
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Excluir(Guid id)
        {
            try
            {
                var username = HttpContext.User.Identity.Name;
                _service.Delete(id, username);
                return CustomResponse();
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPut]
        public async Task<ActionResult> Atualizar(MultaDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);
                var username = HttpContext.User.Identity.Name;
                var result = _service.Update<MultaDto, MultaDto, MultaValidator>(dto, username);
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
