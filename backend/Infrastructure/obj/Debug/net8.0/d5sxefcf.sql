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
VALUES ('123456', 'A001', '2024-09-12T16:28:32.6049377-03:00', 'Excesso de velocidade', 'ABC-1234'),
('654321', 'A002', '2024-09-12T16:28:32.6049391-03:00', 'Estacionamento proibido', 'XYZ-9876'),
('789123', 'A003', '2024-09-12T16:28:32.6049393-03:00', 'Avanço de sinal vermelho', 'DEF-5678');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'NumeroAIT', N'CodigoInfracao', N'DataInfracao', N'DescricaoInfracao', N'PlacaVeículo') AND [object_id] = OBJECT_ID(N'[Multas]'))
    SET IDENTITY_INSERT [Multas] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TipoUsuario', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] ON;
INSERT INTO [Users] ([Id], [AccessFailedCount], [ConcurrencyStamp], [Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], [NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], [SecurityStamp], [TipoUsuario], [TwoFactorEnabled], [UserName])
VALUES ('2b1492f7-2a7d-4cf0-b02b-089d2428cb8e', 0, 'concurrencystamp3', 'admin@example.com', CAST(1 AS bit), CAST(1 AS bit), NULL, 'ADMIN@EXAMPLE.COM', 'ADMIN_USER', 'hashedpassword789', '555123456', CAST(1 AS bit), 'securitystamp3', 1, CAST(1 AS bit), 'admin_user'),
('47904ad2-ae85-4b5a-ab3e-bdc640f6434a', 0, 'concurrencystamp1', 'john@example.com', CAST(1 AS bit), CAST(1 AS bit), NULL, 'JOHN@EXAMPLE.COM', 'JOHN_DOE', 'hashedpassword123', '123456789', CAST(1 AS bit), 'securitystamp1', 0, CAST(0 AS bit), 'john_doe'),
('fd7484bc-ec4f-4a03-a5ea-0698d1d64679', 0, 'concurrencystamp2', 'jane@example.com', CAST(1 AS bit), CAST(1 AS bit), NULL, 'JANE@EXAMPLE.COM', 'JANE_DOE', 'hashedpassword456', '987654321', CAST(1 AS bit), 'securitystamp2', 0, CAST(0 AS bit), 'jane_doe');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessFailedCount', N'ConcurrencyStamp', N'Email', N'EmailConfirmed', N'LockoutEnabled', N'LockoutEnd', N'NormalizedEmail', N'NormalizedUserName', N'PasswordHash', N'PhoneNumber', N'PhoneNumberConfirmed', N'SecurityStamp', N'TipoUsuario', N'TwoFactorEnabled', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240912192833_Mig', N'8.0.8');
GO

COMMIT;
GO

