using Domain.Enums;

namespace Domain.Entities
{
    public class DadosUsuario
	{
		public string Id { get; set; }
		public string Token { get; set; }
		public TipoUsuario Tipo { get; set; }
	}
}
