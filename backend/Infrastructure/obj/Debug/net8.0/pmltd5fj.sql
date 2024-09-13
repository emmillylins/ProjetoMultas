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

CREATE TABLE [IdentityUserClaims] (
    [Id] int NOT NULL,
    [UserId] varchar(100) NULL,
    [ClaimType] varchar(100) NULL,
    [ClaimValue] varchar(100) NULL
);
GO

CREATE TABLE [IdentityUserLogins] (
    [LoginProvider] varchar(100) NULL,
    [ProviderKey] varchar(100) NULL,
    [UserId] varchar(100) NULL
);
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

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TipoUsuario', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[AspNetUsers]'))
    SET IDENTITY_INSERT [AspNetUsers] ON;
INSERT INTO [AspNetUsers] ([Id], [AccessFailedCount], [ConcurrencyStamp], [Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], [NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], [SecurityStamp], [TipoUsuario], [TwoFactorEnabled], [UserName])
VALUES ('75cec525-a481-4655-b180-8f32c0ae15c7', 0, 'fcea5d8a-94b1-4148-b2fb-2c5dc2c164da', 'admin@example.com', CAST(1 AS bit), CAST(1 AS bit), NULL, 'ADMIN@EXAMPLE.COM', 'ADMIN', 'AQAAAAIAAYagAAAAEOCPd880h2RnBKjwtgtD2Zwg6jdkQ5wo83164jDDH0cps+PNjZHTa2K2qIajrVhz4g==', '123456789', CAST(1 AS bit), 'PA34VHZ5OSR2NC2ZCUTINPHU6NGYCQB5', 1, CAST(1 AS bit), 'admin');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TipoUsuario', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[AspNetUsers]'))
    SET IDENTITY_INSERT [AspNetUsers] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'NumeroAIT', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'PlacaVeículo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] ON;
INSERT INTO [Multas] ([NumeroAIT], [CodigoInfracao], [DataInfracao], [DescricaoInfracao], [PlacaVeículo])
VALUES ('123456', 'A001', '2024-09-13T10:13:30.5854650-03:00', 'Excesso de velocidade', 'ABC-1234'),
('654321', 'A002', '2024-09-13T10:13:30.5854662-03:00', 'Estacionamento proibido', 'XYZ-9876'),
('789123', 'A003', '2024-09-13T10:13:30.5854664-03:00', 'Avanço de sinal vermelho', 'DEF-5678');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'NumeroAIT', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'PlacaVeículo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240913131331_Mig', N'8.0.8');
GO

COMMIT;
GO

