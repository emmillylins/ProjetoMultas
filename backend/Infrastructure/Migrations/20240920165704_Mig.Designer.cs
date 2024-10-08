﻿// <auto-generated />
using System;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(DataDbContext))]
    [Migration("20240920165704_Mig")]
    partial class Mig
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("TipoUsuario")
                        .HasColumnType("int");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.ApplicationUserToken", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("DataCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Value")
                        .HasColumnType("varchar(500)");

                    b.Property<bool>("IsExpired")
                        .HasColumnType("bit");

                    b.Property<string>("LoginProvider")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("UserId", "DataCriacao", "Value");

                    b.ToTable("AspNetUserToken", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.Multa", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CodigoInfracao")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("DataCriacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValue(new DateTime(2024, 9, 20, 13, 57, 4, 596, DateTimeKind.Local).AddTicks(9761));

                    b.Property<DateTime>("DataInfracao")
                        .HasColumnType("datetime2");

                    b.Property<string>("DescricaoInfracao")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("NumeroAIT")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("PlacaVeiculo")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.HasKey("Id");

                    b.ToTable("Multas", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("bad0de12-4e64-4587-9d53-de7e4a81f28f"),
                            CodigoInfracao = "A001",
                            DataCriacao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7549),
                            DataInfracao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7514),
                            DescricaoInfracao = "Excesso de velocidade",
                            NumeroAIT = "123456",
                            PlacaVeiculo = "ABC-1234"
                        },
                        new
                        {
                            Id = new Guid("886f331a-e487-433d-a4cd-2e5bc56b1f05"),
                            CodigoInfracao = "A002",
                            DataCriacao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7564),
                            DataInfracao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7554),
                            DescricaoInfracao = "Estacionamento proibido",
                            NumeroAIT = "654321",
                            PlacaVeiculo = "XYZ-9876"
                        },
                        new
                        {
                            Id = new Guid("dafdfaec-e9ac-4482-baed-1b813e44ef32"),
                            CodigoInfracao = "A003",
                            DataCriacao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7567),
                            DataInfracao = new DateTime(2024, 9, 20, 13, 57, 4, 592, DateTimeKind.Local).AddTicks(7566),
                            DescricaoInfracao = "Avanço de sinal vermelho",
                            NumeroAIT = "789123",
                            PlacaVeiculo = "DEF-5678"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("AspNetRole", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<string>("ClaimType")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(100)");

                    b.ToTable("AspNetRoleClaim", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<string>("ClaimType")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(100)");

                    b.ToTable("AspNetUserClaim", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ProviderKey")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(100)");

                    b.ToTable("AspNetUserLogin", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(100)");

                    b.HasKey("UserId", "RoleId");

                    b.ToTable("AspNetUserRole", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
