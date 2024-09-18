using Domain.Entities;
using Infrastructure.Interfaces;
using Infrastructure.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : MainController
    {
        private readonly IConfiguration _configuration;
        private readonly IBaseRepository<ApplicationUser> _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAuthService _authService;

        public AuthController(INotificador notificador, IAuthService authService, IConfiguration configuration, IBaseRepository<ApplicationUser> repository, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : base(notificador)
        {
            _authService = authService;
            _configuration = configuration;
            _repository = repository;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] Login login)
        {
            try
            {
                if (!ModelState.IsValid)return CustomResponse(ModelState);

                var token = await _authService.Login(login);
                return CustomResponse(token);
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [AllowAnonymous]
        [HttpPost("cadastro")]
        public async Task<ActionResult> Cadastro([FromBody] CadastroUsuario register)
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);

                var result = await _authService.Register(register);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro(ex.Message);
                return CustomResponse();
            }
        }

        [HttpGet("usuarios")]
        public async Task<ActionResult> ListarUsuarios()
        {
            try
            {
                if (!ModelState.IsValid) return CustomResponse(ModelState);

                var result = await _authService.GetUsersAsync();
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
