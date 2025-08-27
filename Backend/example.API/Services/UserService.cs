using example.API.DTOs;
using example.API.DTOs.Requests;
using example.API.DTOs.Results;
using example.API.Interfaces;
using example.API.Models;
using Microsoft.Data.SqlClient;

namespace example.API.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<ApiResponse> AddAsync(CreateUserDto createUserDto)
        {
            var response = new ApiResponse { Code = string.Empty };
            using (var conn = new SqlConnection(_connectionString))
            {
                var user = new User
                {
                    Address = createUserDto.Address,
                    Email = createUserDto.Email,
                    FirstName = createUserDto.FirstName,
                    LastName = createUserDto.LastName,
                    PhoneNumber = createUserDto.PhoneNumber,
                    Username = createUserDto.Username
                };
                user.SetPassword(createUserDto.Password);
                using (var cmd = new SqlCommand("dbo.InsertUser", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Address", user.Address ?? "");
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName ?? "");
                    cmd.Parameters.AddWithValue("@LastName", user.LastName ?? "");
                    cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
                    cmd.Parameters.AddWithValue("@PasswordSalt", user.PasswordSalt);
                    cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber ?? "");
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            response.Code = reader["code"].ToString();
                            response.Message = reader["message"].ToString();
                        }
                    }

                    return response;
                }
            }
        }
        public async Task<ApiResponse> DeleteAsync(int id)
        {
            int rowsAffected;
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("dbo.DeleteUser", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                await conn.OpenAsync();
                rowsAffected = await cmd.ExecuteNonQueryAsync();
            }
            var response = new ApiResponse
            {
                Code = rowsAffected > 0 ? "0" : "USER_NOT_FOUND",
                Message = rowsAffected > 0 ? "Eliminado Exitosamente" : "Usuario no encontrado"
            };
            return response;
        }

        public async Task<ApiResponse> GetAsync()
        {
            var usuarios = new List<UserDto>();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    var cmd = new SqlCommand("dbo.GetUsers", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new UserDto
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Address = reader["address"].ToString(),
                                Email = reader["email"].ToString(),
                                Username = reader["username"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                PhoneNumber = reader["phoneNumber"].ToString()
                            };
                            usuarios.Add(user);
                        }

                    }
                }
                var response = new ApiResponse { Code = string.Empty };
                if (usuarios.Count > 0)
                {
                    response.Code = "0";
                    response.Data = usuarios;
                }
                else
                {
                    response.Code = "USERS_NOT_FOUND";
                    response.Message = "No existen usuarios registrados";
                }
                return response;
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task<ApiResponse> GetByIdAsync(int id)

        {
            var user = new UserDto
            {
                Email = string.Empty,
                Username = string.Empty
            };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    var cmd = new SqlCommand("dbo.GetByIdUser", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            user.Id = Convert.ToInt32(reader["Id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.Username = reader["username"].ToString();
                            user.FirstName = reader["FirstName"].ToString();
                            user.LastName = reader["LastName"].ToString();
                            user.PhoneNumber = reader["phoneNumber"].ToString();
                        }

                    }
                }
                var response = new ApiResponse { Code = string.Empty };
                if (user == null)
                {
                    response.Code = "0";
                    response.Message = "No existe un usuario registrado con este id";
                }
                else
                {
                    response.Code = "1";
                    response.Data = user;
                }
                return response;
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task<ApiResponse> SearchAsync(string textSearch)
        {
            var usuarios = new List<UserDto>();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    var cmd = new SqlCommand("dbo.SearchUsers", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SearchTerm", textSearch);
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new UserDto
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Address = reader["Address"].ToString(),
                                Email = reader["Email"].ToString(),
                                Username = reader["Username"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                PhoneNumber = reader["PhoneNumber"].ToString()
                            };
                            usuarios.Add(user);
                        }
                    }
                }
                var response = new ApiResponse { Code = string.Empty };
                if (usuarios.Count > 0)
                {
                    response.Code = "0";
                    response.Data = usuarios;
                }
                else
                {
                    response.Code = "USER_NOT_FOUND";
                    response.Message = "No se encontraron usuarios con estos parametros de bsuqueda";
                }
                return response;
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task<ApiResponse> UpdateAsync(int id, UpdateUserDto updateUserDto)
        {
            var user = new User
            {
                Id = id,
                Address = updateUserDto.Address,
                Email = updateUserDto.Email,
                FirstName = updateUserDto.FirstName,
                LastName = updateUserDto.LastName,
                PhoneNumber = updateUserDto.PhoneNumber,
                Username = updateUserDto.Username
            };
            user.SetPassword(updateUserDto.Password);

            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("dbo.UpdateUser", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", user.Id);
                cmd.Parameters.AddWithValue("@address", user.Address ?? "");
                cmd.Parameters.AddWithValue("@FirstName", user.FirstName ?? "");
                cmd.Parameters.AddWithValue("@LastName", user.LastName ?? "");
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
                cmd.Parameters.AddWithValue("@PasswordSalt", user.PasswordSalt);
                cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber ?? "");
                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
            }
            var response = new ApiResponse
            {
                Code = "0",
                Message = "Actualizado Exitosamente"
            };
            return response;
        }
    }

}
