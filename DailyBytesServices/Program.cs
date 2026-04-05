using Microsoft.EntityFrameworkCore;
using DailyBytesDataAccessLayer;
using DailyBytesDataAccessLayer.Models;

namespace DailyBytesServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<DailyBytesRepository>(new DailyBytesRepository(new DailyBytesDbContext(new DbContextOptions<DailyBytesDbContext>())));


            var app = builder.Build();

            app.UseCors(
                options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()
            );
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
