namespace example.API.DTOs.Results;

public class ApiResponse
{
    public required string Code { get; set; }

    public string? Message { get; set; }
    public dynamic? Data { get; set; }
}
