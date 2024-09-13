# ProjetoMultas

- CRUD de multas.
- Autenticação de usuários.
- Permissão de usuário para edição e exclusão. 

## Tecnologias usadas
- .NET 8
- Entity Framework Core
- SQL Server

String de Conexão a ser configurada no appsettings.json

### Comandos CLI (Command Line Interface)
- dotnet ef migrations add NewMigration -c DataDbContext
- dotnet ef migrations script -c DataDbContext
- dotnet ef migrations remove -c DataDbContext
- dotnet ef database update
