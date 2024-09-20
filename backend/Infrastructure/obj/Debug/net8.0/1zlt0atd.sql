IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [AspNetRole] (
    [Id] varchar(100) NOT NULL,
    [Name] varchar(100) NULL,
    [NormalizedName] varchar(100) NULL,
    [ConcurrencyStamp] varchar(100) NULL,
    CONSTRAINT [PK_AspNetRole] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetRoleClaim] (
    [Id] int NOT NULL,
    [RoleId] varchar(100) NULL,
    [ClaimType] varchar(100) NULL,
    [ClaimValue] varchar(100) NULL
);
GO

CREATE TABLE [AspNetUserClaim] (
    [Id] int NOT NULL,
    [UserId] varchar(100) NULL,
    [ClaimType] varchar(100) NULL,
    [ClaimValue] varchar(100) NULL
);
GO

CREATE TABLE [AspNetUserLogin] (
    [LoginProvider] varchar(100) NOT NULL,
    [ProviderKey] varchar(100) NOT NULL,
    [ProviderDisplayName] varchar(100) NULL,
    [UserId] varchar(100) NULL
);
GO

CREATE TABLE [AspNetUserRole] (
    [UserId] varchar(100) NOT NULL,
    [RoleId] varchar(100) NOT NULL,
    CONSTRAINT [PK_AspNetUserRole] PRIMARY KEY ([UserId], [RoleId])
);
GO

CREATE TABLE [AspNetUsers] (
    [Id] varchar(100) NOT NULL,
    [TipoUsuario] int NOT NULL,
    [UserName] varchar(100) NULL,
    [NormalizedUserName] varchar(100) NULL,
    [Email] varchar(100) NULL,
    [NormalizedEmail] varchar(100) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] varchar(100) NULL,
    [SecurityStamp] varchar(100) NULL,
    [ConcurrencyStamp] varchar(100) NULL,
    [PhoneNumber] varchar(100) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetUserToken] (
    [UserId] varchar(100) NOT NULL,
    [LoginProvider] varchar(100) NOT NULL,
    [Name] varchar(100) NOT NULL,
    [Value] varchar(100) NULL,
    CONSTRAINT [PK_AspNetUserToken] PRIMARY KEY ([UserId], [LoginProvider], [Name])
);
GO

CREATE TABLE [Multas] (
    [Id] uniqueidentifier NOT NULL,
    [NumeroAIT] varchar(50) NOT NULL,
    [DataInfracao] datetime2 NOT NULL,
    [CodigoInfracao] varchar(50) NOT NULL,
    [DescricaoInfracao] varchar(50) NOT NULL,
    [PlacaVeiculo] varchar(10) NOT NULL,
    CONSTRAINT [PK_Multas] PRIMARY KEY ([Id])
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'NumeroAIT', N'PlacaVeiculo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] ON;
INSERT INTO [Multas] ([Id], [CodigoInfracao], [DataInfracao], [DescricaoInfracao], [NumeroAIT], [PlacaVeiculo])
VALUES ('2538c95d-fede-46f4-9408-84227fe661de', 'A001', '2024-09-19T11:07:18.0158920-03:00', 'Excesso de velocidade', '123456', 'ABC-1234'),
('3b814b0c-f2a9-4425-a0a0-d28afc8e35cc', 'A003', '2024-09-19T11:07:18.0158978-03:00', 'Avanço de sinal vermelho', '789123', 'DEF-5678'),
('c3d64649-fbaa-4083-8b8a-2690ec17d635', 'A002', '2024-09-19T11:07:18.0158976-03:00', 'Estacionamento proibido', '654321', 'XYZ-9876');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'NumeroAIT', N'PlacaVeiculo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240919140718_Mig', N'8.0.8');
GO

COMMIT;
GO

