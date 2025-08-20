using example.API.DTOs.Results;
using example.API.Models;

namespace example.API.Interfaces;

public interface IUserService
{
    Task<ApiResponse> AddAsync(User user);
    Task<ApiResponse> DeleteAsync(int id);
    Task<ApiResponse> GetAsync();
    Task<ApiResponse> GetByIdAsync(int id);
    Task<ApiResponse> SearchAsync(string textSearch);
    Task<ApiResponse> UpdateAsync(int id, User user);
}
