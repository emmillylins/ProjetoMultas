﻿using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Context;
using Infrastructure.Interfaces;

namespace Application.Services
{
    public class MultaService : IMultaService 
    {
        private readonly IBaseRepository<Multa> _repository;
        private readonly DataDbContext _context;
        private readonly IMapper _mapper;

        public MultaService(IBaseRepository<Multa> repository, IMapper mapper, DataDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<TOutputModel>> GetAsync<TOutputModel>() where TOutputModel : class
        {
            try
            {
                var entities = await _repository.SelectAsync();

                var outputModels = entities.OrderByDescending(e => e.DataInfracao).Select(_mapper.Map<TOutputModel>);
                return outputModels;
            }
            catch (Exception) { throw; }
        }

        public async Task<TOutputModel> GetAsync<TOutputModel>(Guid id) where TOutputModel : class
        {
            try
            {
                var entity = await _repository.SelectAsync(id) ?? throw new Exception("Multa não encontrada.");

                var outputModel = _mapper.Map<TOutputModel>(entity);
                return outputModel;
            }
            catch (Exception) { throw; }
        }

        public async Task<TOutputModel> InsertAsync<TInputModel, TOutputModel, TValidator>(TInputModel inputModel)
            where TInputModel : class
            where TOutputModel : class
            where TValidator : AbstractValidator<Multa>
        {
            try
            {
                var entity = _mapper.Map<Multa>(inputModel);
                
                Validation<TValidator>(entity);

                var multas = await _repository.SelectAsync();
                var multaExistente = multas.OrderBy(m => m.NumeroAIT).FirstOrDefault(m => m.NumeroAIT == entity.NumeroAIT);

                if (multaExistente is not null)
                {
                    multaExistente.PermiteEdicao = false;
                    return _mapper.Map<TOutputModel>(multaExistente);
                }

                // Regra 2: Pesquisa do AIT eliminando dígitos da esquerda
                multaExistente = BuscarPorNumeroAIT(multas, entity.NumeroAIT);
                
                if (multaExistente is not null)
                {
                    // Verifica a Regra 3: Data, Hora, Minuto da Infração
                    if (multas.Any(m => m.DataInfracao == entity.DataInfracao))
                    {
                        // Verifica a Regra 4: Código da Infração
                        if (multas.Any(m => m.CodigoInfracao == entity.CodigoInfracao))
                        {
                            // Regra 5: Verificação da Placa do Veículo
                            if (multas.Any(m => m.PlacaVeículo == entity.PlacaVeículo))
                            {
                                throw new Exception("PENDÊNCIA AIT: Multa já registrada.");
                            }
                        }
                    }
                }

                // Inserir nova multa
                await _repository.InsertAsync(entity);
                await _context.SaveChangesAsync();

                entity.PermiteEdicao = true;
                var outputModel = _mapper.Map<TOutputModel>(entity);
                return outputModel;
            }
            catch (Exception) { throw; }
        }


        public TOutputModel Update<TInputModel, TOutputModel, TValidator>(TInputModel inputModel)
            where TInputModel : class
            where TOutputModel : class
            where TValidator : AbstractValidator<Multa>
        {
            try
            {
                var entity = _mapper.Map<Multa>(inputModel) ?? throw new Exception("Erro de mapping.");

                if (_repository.Select(entity.Id) is null) throw new Exception("Número do AIT não encontrado.");

                Validation<TValidator>(entity);

                _repository.Update(entity);
                _context.SaveChanges();

                var outputModel = _mapper.Map<TOutputModel>(entity);
                return outputModel;
            }
            catch (Exception) { throw; }
        }

        public void Delete(Guid id)
        {
            try
            {
                var entity = _repository.Select(id) ?? throw new Exception("Número do AIT não encontrado.");

                _repository.Delete(entity);
                _context.SaveChanges();
            }
            catch (Exception) { throw; }
        }

        #region métodos auxiliares
        public Multa BuscarPorNumeroAIT(List<Multa> multas, string numeroAIT)
        {
            while (!string.IsNullOrEmpty(numeroAIT))
            {
                // Procura na lista de multas
                var multaEncontrada = multas.FirstOrDefault(m => m.NumeroAIT == numeroAIT);
                if (multaEncontrada != null)
                {
                    return multaEncontrada; // Retorna a multa se encontrar correspondência
                }

                // Remove o primeiro dígito da esquerda
                numeroAIT = numeroAIT.Substring(1);
            }

            // Se não encontrar nenhuma correspondência, retorna null
            return null;
        }

        private static void Validation<TValidator>(Multa entity) where TValidator : AbstractValidator<Multa>
        {
            try
            {
                var validator = Activator.CreateInstance<TValidator>();
                var result = validator.Validate(entity);

                if (!result.IsValid)
                {
                    var errors = result.Errors.Select(error => new string(error.ErrorMessage));
                    var errorString = string.Join(Environment.NewLine, errors);

                    throw new Exception(errorString);
                }
            }
            catch (Exception) { throw; }
        }
        #endregion
    }
}
