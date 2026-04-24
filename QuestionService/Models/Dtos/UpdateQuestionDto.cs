using System.ComponentModel.DataAnnotations;
using QuestionService.Validators;

namespace QuestionService.Models.Dtos;

public record UpdateQuestionDto(
    [Required] string Title,
    [Required] string Content,
    [Required] [TagListValidator(1, 5)] List<string> Tags
);