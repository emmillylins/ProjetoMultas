using Domain.Enums;

namespace Domain.Entities
{
    public class DadosUsuario
	{
		public string Token { get; set; }
		public string Username { get; set; }
		public TipoUsuario TipoUsuario { get; set; }
	}
}
