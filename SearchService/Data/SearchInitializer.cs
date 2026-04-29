using Typesense;

namespace SearchService.Data;

public static class SearchInitializer
{
    public static async Task EnsureIndexExists(ITypesenseClient client)
    {
        //await client.DeleteCollection("questions");
        const string schemaName = "questions";
        try
        {
            await client.RetrieveCollection(schemaName);
            Console.WriteLine($"Collection '{schemaName}' already exists.");
            return;
        }
        catch (TypesenseApiNotFoundException e)
        {
            Console.WriteLine($"Collection {schemaName} has not been created yet.");
        }
        
        var schema = new Schema(
            name: schemaName,
            fields: new List<Field>
            {
                new Field("id", FieldType.String),
                new Field("title", FieldType.String),
                new Field("content", FieldType.String),
                new Field("tags", FieldType.StringArray),
                new Field("createdAt", FieldType.Int64),
                new Field("hasAcceptedAnswer", FieldType.Bool),
                new Field("answerCount", FieldType.Int32)
            },
            defaultSortingField: "createdAt"
        );
        await client.CreateCollection(schema);
        Console.WriteLine($"Collection '{schemaName}' created successfully.");
    }
}