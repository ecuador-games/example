using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace example.API.DTOs.Requests;

public class UpdateUserDto
{
    public int Id { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
}
