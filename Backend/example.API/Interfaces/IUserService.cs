using example.API.DTOs;
using example.API.DTOs.Requests;
using example.API.DTOs.Results;
using example.API.Models;

namespace example.API.Interfaces;

public interface IUserService
{
    Task<ApiResponse> AddAsync(CreateUserDto createUserDto);
    Task<ApiResponse> DeleteAsync(int id);
    Task<ApiResponse> GetAsync();
    Task<ApiResponse> GetByIdAsync(int id);
    Task<ApiResponse> SearchAsync(string textSearch);
    Task<ApiResponse> UpdateAsync(int id, UpdateUserDto updateUserDto);
}
