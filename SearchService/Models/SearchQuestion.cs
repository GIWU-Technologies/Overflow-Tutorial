using System.Text.Json.Serialization;

namespace SearchService.Models;

public class SearchQuestion
{
    [JsonPropertyName("id")]
    public required string Id { get; set; }
    [JsonPropertyName("title")]
    public required string Title { get; set; } = string.Empty;
    [JsonPropertyName("content")]
    public required string Content { get; set; } = string.Empty;
    [JsonPropertyName("tags")] 
    public string[] Tags { get; set; } = [];
    [JsonPropertyName("createdAt")]
    public long CreatedAt { get; set; } // NOTE: typesense uses long to represent date(?)
    [JsonPropertyName("hasAcceptedAnswer")]
    public bool HasAcceptedAnswer { get; set; }
    [JsonPropertyName("answerCount")]
    public int AnswerCount { get; set; }
}