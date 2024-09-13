using AutoMapper;
using Domain.Interfaces;
using Domain.Services;
using UserClass.Entities;
using Data.Context;
using Data.Repository;
using WebApi.Dto;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var server = Configuration["database:mysql:server"];
            var database = Configuration["database:mysql:database"];
            services.AddControllers();
            services.AddDbContext<DataDbContext>(options =>
            {
                options.UseSqlServer(@"data source=(localdb)\Db;initial catalog=DataBase;TrustServerCertificate=True;Integrated Security=SSPI", opt =>
                {
                    opt.MigrationsAssembly("WebApi");
                    opt.CommandTimeout(180);
                    opt.EnableRetryOnFailure(5);
                });
            });

            //USER
            services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            services.AddScoped<IBaseService<User>, BaseService<User>>();
            services.AddSingleton(new MapperConfiguration(config =>
            {
                config.CreateMap<CreateUserDto, User>();
                config.CreateMap<User, UserDto>();
                config.CreateMap<UserDto, User>();
            }).CreateMapper());
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options.AllowAnyOrigin());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
