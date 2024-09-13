using Domain.Entities;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Task<List<ApplicationUser>> GetUsersAsync();
        Task<string> Login(Login login);
        Task<string> Register(Register registerModel);
    }
}
