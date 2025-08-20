namespace example.API.DTOs;

public record UserDto
{
    public int Id { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public required string Username { get; set; }
}
