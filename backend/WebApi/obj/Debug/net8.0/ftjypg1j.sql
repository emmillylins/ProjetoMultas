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

CREATE TABLE [Multas] (
    [NumeroAIT] varchar(50) NOT NULL,
    [DataInfracao] datetime2 NOT NULL,
    [CodigoInfracao] varchar(50) NOT NULL,
    [DescricaoInfracao] varchar(50) NOT NULL,
    [PlacaVeículo] varchar(10) NOT NULL,
    CONSTRAINT [PK_Multas] PRIMARY KEY ([NumeroAIT])
);
GO

CREATE TABLE [Users] (
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
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'NumeroAIT', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'PlacaVeículo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] ON;
INSERT INTO [Multas] ([NumeroAIT], [CodigoInfracao], [DataInfracao], [DescricaoInfracao], [PlacaVeículo])
VALUES ('123456', 'A001', '2024-09-12T00:00:00.0000000', 'Excesso de velocidade', 'ABC-1234');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'NumeroAIT', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'PlacaVeículo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240912190824_Mig', N'8.0.8');
GO

COMMIT;
GO

