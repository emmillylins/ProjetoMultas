using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
	public class Login
	{
		public string Id { get; set; }
		public string Password { get; set; }
	}

	public class Register
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; } 

        public TipoUsuario TipoUsuario { get; set; }
    }
}
