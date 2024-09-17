using Domain.Entities;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> GetUsersAsync();
        Task<DadosUsuario> Login(Login login);
        Task<string> Register(CadastroUsuario registerModel);
    }
}
