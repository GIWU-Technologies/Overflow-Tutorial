using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Common;

public static class AuthExtensions
{
    public static IServiceCollection AddKeyCloakAuthentication(this IServiceCollection services)
    {
        // keycloak
        services.AddAuthentication()
            .AddKeycloakJwtBearer(serviceName: "keycloak", realm: "overflow", options =>
            {
                //options.Authority = "http://localhost:6001";
                options.Audience = "overflow";
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuers = [
                        "http://localhost:6001/realms/overflow",
                        "http://keycloak/realms/overflow",
                        "http://id.overflow.local/realms/overflow",
                    ]
                };
            });

        return services;
    }
}