using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Domain.Enums;

namespace Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IBaseRepository<ApplicationUser> _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(IConfiguration configuration, IBaseRepository<ApplicationUser> repository, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _configuration = configuration;
            _repository = repository;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<List<ApplicationUser>> GetUsersAsync()
        {
            try
            {
                return await _repository.SelectAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<string> Login(Login login)
        {
            try
            {
                var users = await _repository.SelectAsync();
                var user = users.SingleOrDefault(u => u.Email == login.Id || u.UserName == login.Id) ?? throw new Exception("Usuário não encontrado.");
                
                if (!await _userManager.IsEmailConfirmedAsync(user)) 
                    throw new Exception("Email não confirmado, acesse seu email para confirmar sua conta.");

                var loginResult = await _signInManager.PasswordSignInAsync(user, login.Password, false, true);

                if (loginResult.Succeeded)
                {
                    Log.Information("Usuário {0} efetuou o login", user.Id);
                    await _signInManager.SignInAsync(user, false);

                    return await GerarJwt(user); 
                }
                else throw new Exception("Erro no login.");
            }
            catch (Exception) { throw; }
        }

        public async Task<string> Register(Register registerModel)
        {
            try
            {
                // Verifica se o e-mail já está em uso
                var existingUser = await _userManager.FindByEmailAsync(registerModel.Email);
                if (existingUser != null) throw new Exception("E-mail já cadastrado.");

                // Criação do objeto ApplicationUser com os dados fornecidos
                var user = new ApplicationUser(registerModel.TipoUsuario)
                {
                    UserName = registerModel.UserName, // Ou outro campo para nome de usuário
                    Email = registerModel.Email, // Se houver número de telefone no modelo
                    EmailConfirmed = true // Considera o e-mail automaticamente confirmado
                };

                // Cria o usuário no banco de dados
                var result = await _userManager.CreateAsync(user, registerModel.Password);

                // Verifica se houve sucesso na criação
                if (result.Succeeded)
                {
                    Log.Information("Usuário {0} cadastrado com sucesso", user.Id);
                    return "Cadastro realizado com sucesso.";
                }
                else
                {
                    // Retorna os erros de criação
                    throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
            catch (Exception ex)
            {
                Log.Error("Erro ao registrar usuário: {0}", ex.Message);
                throw;
            }
        }

        public async Task<string> GerarJwt(ApplicationUser user)
        {
            // 1. Definir as claims do token
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id),           
                new(JwtRegisteredClaimNames.Email, user.Email),       
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) 
            };

            // Adiciona roles como claims
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // 2. Chave de assinatura do token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 3. Configuração do token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],          
                audience: _configuration["Jwt:Audience"],       
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),           
                signingCredentials: creds                      
            );

            // 4. Gerar a string do token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
