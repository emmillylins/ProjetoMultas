using Domain.Enums;

namespace Domain.Entities
{
    public class Login
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}

    public class DadosUsuario
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public TipoUsuario Tipo { get; set; }
    }
}
