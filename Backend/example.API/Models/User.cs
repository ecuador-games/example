using System.ComponentModel.DataAnnotations;

namespace example.API.Models;

/// <summary>
/// Represents a user in the system.
/// </summary>
/// <remarks>
/// This class contains properties and methods related to user information,
/// such as username, email, and authentication details. 
/// It can be extended to include additional user-related functionality as needed.
/// </remarks>
public class User
{
    /// <summary>
    /// Unique identifier for the user.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Username used for login and identification.
    /// </summary>
    [Required, MaxLength(100)]
    public required string Username { get; set; }

    /// <summary>
    /// Physical or mailing address of the user (optional).
    /// </summary>
    [MaxLength(300)]
    public string? Address { get; set; }

    /// <summary>
    /// Email address of the user. Must be unique and valid.
    /// </summary>
    [Required, EmailAddress, MaxLength(100)]
    public required string Email { get; set; }

    /// <summary>
    /// User's first name (optional).
    /// </summary>
    [MaxLength(100)]
    public string? FirstName { get; set; }

    /// <summary>
    /// User's last name (optional).
    /// </summary>
    [MaxLength(100)]
    public string? LastName { get; set; }



    /// <summary>
    /// Hashed password for authentication. Never store plain text passwords.
    /// </summary>
    [Required, MaxLength(256)]
    public required string PasswordHash { get; set; }

    /// <summary>
    /// Salt used for hashing the password.
    /// </summary>
    [Required, MaxLength(128)]
    public required string PasswordSalt { get; set; }


    /// <summary>
    /// Sets the password by generating a salt and hashing the plain text password with it.
    /// </summary>
    /// <param name="password">Plain text password</param>
    public void SetPassword(string password)
    {
        // Genera un salt seguro
        var saltBytes = new byte[16];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }
        PasswordSalt = Convert.ToBase64String(saltBytes);

        // Hashea la contraseña junto con el salt
        using var sha = System.Security.Cryptography.SHA256.Create();
        var combined = System.Text.Encoding.UTF8.GetBytes(password + PasswordSalt);
        var hash = sha.ComputeHash(combined);
        PasswordHash = Convert.ToBase64String(hash);
    }


    /// <summary>
    /// Verifies if the provided password matches the stored hash using the stored salt.
    /// </summary>
    /// <param name="password">Plain text password</param>
    /// <returns>True if the password matches, false otherwise.</returns>
    public bool VerifyPassword(string password)
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        var combined = System.Text.Encoding.UTF8.GetBytes(password + PasswordSalt);
        var hash = sha.ComputeHash(combined);
        var hashString = Convert.ToBase64String(hash);
        return PasswordHash == hashString;
    }

    /// <summary>
    /// User's phone number (optional).
    /// </summary>
    [Phone, MaxLength(20)]
    public string? PhoneNumber { get; set; }

    // Sugerencias de mejora:
    // - Considera almacenar el password como hash y no como texto plano.
    // - Puedes agregar propiedades como DateCreated, IsActive, o Roles para mayor funcionalidad.
    // - Usa validaciones adicionales según las reglas de negocio.
    // - Implementa interfaces como IUser si tu arquitectura lo requiere.
}