using Application.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;

namespace WebApi.Configuration
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Middleware para validar tokens de autenticação e gerenciar sessões de usuários.
        /// Verifica JWT, valida informações de sessão e aplica políticas de acesso.
        /// </summary>
        /// <param name="context">O contexto da solicitação HTTP.</param>
        /// <param name="authService">O serviço de autenticação responsável pela manipulação de tokens.</param>
        /// <returns>Uma tarefa assíncrona que representa a execução do middleware.</returns>
        public async Task Invoke(HttpContext context, AuthService authService)
        {
            DateTime horaAtualBrasilia = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time")); // Obtém a hora atual do Brasil

            var tokenAcesso = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last(); // Obtém o JWT da rota com autorização

            var rotaApi = context.Request.Path.StartsWithSegments(new PathString("/api"));

            if (rotaApi)
            {
                var endpoint = context.GetEndpoint(); // Obtém o endpoint da rota e permite usar o data annotation [AllowAnonymous]

                if (authService.AllowsAnonymousRoute(endpoint) == true)
                {
                    await _next(context);
                    return;
                }

                try
                {
                    if (string.IsNullOrEmpty(tokenAcesso) || tokenAcesso == "Bearer") // Se acessar rota sem jwt
                    {
                        throw new SecurityTokenValidationException("Acesso negado. Faça o login para acessar.");
                    }

                }
                catch (SecurityTokenValidationException se) // Tratamento de exceção de autorização
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    context.Response.ContentType = "application/json";
                    var response = new
                    {
                        success = false,
                        errors = new[] { se.Message }
                    };

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    }));
                    return;
                }
                catch (Exception) // Outras exceções, gera 500
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var response = new
                    {
                        success = false,
                        errors = new[] { "Ocorreu um erro inesperado." }
                    };

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    }));
                    return;
                }
            }
            await _next(context);
        }
    }

}
