using System.Net.Sockets;
using Common;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Polly;
using QuestionService.Data;
using QuestionService.Services;
using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;
using Wolverine;
using Wolverine.RabbitMQ;

namespace QuestionService;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        
        // aspire config
        builder.AddServiceDefaults();

        builder.Services.AddMemoryCache();
        builder.Services.AddScoped<TagService>();

        builder.Services.AddKeyCloakAuthentication();
        
        builder.AddNpgsqlDbContext<QuestionDbContext>("questionDb");

        await builder.UseWolverineWithRabbitMqAsync(opts =>
        {
            opts.PublishAllMessages().ToRabbitExchange("questions");
            opts.ApplicationAssembly = typeof(Program).Assembly;
        });
     
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        //app.UseAuthorization();


        app.MapControllers();

        // aspire endpoints (health/alive etc.)
        app.MapDefaultEndpoints();
        
        // apply migrations
        // get the db context using the service locator pattern
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var dbContext = services.GetRequiredService<QuestionDbContext>();
            await dbContext.Database.MigrateAsync();
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occured with migrating or seeding the database.");
        }
        

        app.Run();
    }
}