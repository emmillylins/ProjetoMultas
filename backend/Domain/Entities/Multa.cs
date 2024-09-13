using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Multa
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string NumeroAIT { get; set; }
        public DateTime DataInfracao { get; set; }
        public string CodigoInfracao { get; set; }
        public string DescricaoInfracao { get; set; }
        public string PlacaVeículo { get; set; }
        public bool PermiteEdicao { get; set; }

        public Multa() { }
        public Multa(string numeroAIT, DateTime dataInfracao, string codigoInfracao, string descricaoInfracao, string placaVeículo, bool permiteEdicao = false)
        {
            NumeroAIT = numeroAIT;
            DataInfracao = dataInfracao;
            CodigoInfracao = codigoInfracao;
            DescricaoInfracao = descricaoInfracao;
            PlacaVeículo = placaVeículo;
            PermiteEdicao = permiteEdicao;
        }
    }
}
