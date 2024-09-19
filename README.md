# ProjetoMultas

- CRUD de multas.
- Autenticação de usuários.
- Permissão de usuário para edição e exclusão. 

### Tecnologias usadas
- SDK .NET 8
- Entity Framework Core
- SQL Server

String de Conexão a ser configurada no appsettings.json.
### Comandos para front-end
- cd ProjetoMultas\web
- npm install, npm install @angular/material-moment-adapter moment
- ng serve

### Comandos para manipulação da Migration no CLI (Command Line Interface)
- dotnet ef migrations add NewMigration -c DataDbContext
- dotnet ef migrations script -c DataDbContext
- dotnet ef migrations remove -c DataDbContext
- dotnet ef database update
