namespace Application.DTOs
{
    public class MultaDto
    {
        public Guid Id { get; set; }
        public string NumeroAIT { get; set; }
        public DateTime DataInfracao { get; set; }
        public string CodigoInfracao { get; set; }
        public string DescricaoInfracao { get; set; }
        public string PlacaVeiculo { get; set; }
        public bool PermiteEdicao { get; set; }
    }
    public class CreateMultaDto
    {
        public string NumeroAIT { get; set; }
        public DateTime DataInfracao { get; set; }
        public string CodigoInfracao { get; set; }
        public string DescricaoInfracao { get; set; }
        public string PlacaVeiculo { get; set; }
    }
}
