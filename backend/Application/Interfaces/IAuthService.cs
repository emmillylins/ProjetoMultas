using Domain.Entities;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> GetUsersAsync();
        Task<DadosUsuario> Login(Login login);
        Task Logout(string token);
        Task<string> Register(CadastroUsuario registerModel);
    }
}
