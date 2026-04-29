using System.Text.RegularExpressions;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using SearchService.Data;
using SearchService.Models;
using Typesense;
using Typesense.Setup;
using Wolverine;
using Wolverine.RabbitMQ;

namespace SearchService;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        //builder.Services.AddAuthorization();

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.AddServiceDefaults();

        // add open telemetry for wolverine/rabbitmq manually
        builder.Services.AddOpenTelemetry()
            .WithTracing(traceProviderBuilder =>
            {
                traceProviderBuilder.SetResourceBuilder(ResourceBuilder.CreateDefault()
                        .AddService(builder.Environment.ApplicationName))
                    .AddSource("Wolverine");
            });
        
        builder.Host.UseWolverine(opts =>
        {
            opts.UseRabbitMqUsingNamedConnection("messaging")
                .AutoProvision();
            opts.ListenToRabbitQueue("questions.search", cfg =>
            {
                cfg.BindExchange("questions");
            });
        });
        

        var typesenseUri = builder.Configuration["services:typesense:typesense:0"];
        if (string.IsNullOrEmpty(typesenseUri))
            throw new InvalidOperationException("Typesense URI not found in config");
        
        var typesenseApiKey = builder.Configuration["typesense-api-key"];
        if (string.IsNullOrEmpty(typesenseApiKey))
            throw new InvalidOperationException("Typesense API key not found in config");

        var uri = new Uri(typesenseUri);

        builder.Services.AddTypesenseClient(config =>
        {
            config.ApiKey = typesenseApiKey;
            config.Nodes = new List<Node>()
            {
                new(uri.Host, uri.Port.ToString(), uri.Scheme)
            };
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.MapDefaultEndpoints();

        app.MapGet("/search", async (string query, ITypesenseClient client) =>
        {
            // [aspire]something (tag search)
            string? tag = null;
            var tagMatch = Regex.Match(query, @"\[(.*?)\]");
            if (tagMatch.Success) 
            {
                tag = tagMatch.Groups[1].Value;
                query = query.Replace(tagMatch.Value, "").Trim();
            }

            var searchParams = new SearchParameters(query, "title,content"); // fields to search on

            if (!string.IsNullOrWhiteSpace(tag))
            {
                searchParams.FilterBy = $"tags:=[{tag}]";
            }

            try
            {
                var results = await client.Search<SearchQuestion>("questions", searchParams);
                return Results.Ok(results.Hits.Select(hit => hit.Document));
            }
            catch (Exception e)
            {
                return Results.Problem("Typesense search failed", e.Message);
            }

        });

        app.MapGet("/search/similar-titles", async (string query, ITypesenseClient client) =>
        {
            var searchParams = new SearchParameters(query, "title");

            try
            {
                var results = await client.Search<SearchQuestion>("questions", searchParams);
                return Results.Ok(results.Hits.Select(hit => hit.Document));
            }
            catch (Exception e)
            {
                return Results.Problem("Typesense search failed", e.Message);
            }
        });

        using var scope = app.Services.CreateScope();
        var client = scope.ServiceProvider.GetRequiredService<ITypesenseClient>();
        await SearchInitializer.EnsureIndexExists(client);

        //app.UseAuthorization();
        

        app.Run();
    }
}