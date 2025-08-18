using example.API.Interfaces;
using example.API.Models;
using Microsoft.Data.SqlClient;

namespace example.API.Services
{
    public class UseService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public UseService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<ApiResponse> AddAsync(User user)
        {
            var response = new ApiResponse();
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("dbo.Usuario_Insert", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Address", user.Address ?? "");
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                cmd.Parameters.AddWithValue("@LastName", user.LastName);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@Telephone", user.PhoneNumber ?? "");
                await conn.OpenAsync();
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        response.Code = reader["code"].ToString();
                        response.Message = reader["message"].ToString();
                    }
                }
            }
            return response;
        }

        public async Task<ApiResponse> DeleteAsync(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                string query = @"DELETE FROM usuario WHERE Id = @id";
                var cmd = new SqlCommand(query, conn);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.AddWithValue("@id", id);
                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
            }
            var response = new ApiResponse
            {
                Code = "1",
                Message = "Eliminado Exitosamente"
            };
            return response;
        }

        public async Task<ApiResponse> GetAsync()
        {
            var usuarios = new List<User>();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    var cmd = new SqlCommand("dbo.Usuario_Get", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new User();
                            user.Id = Convert.ToInt32(reader["Id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["FirstName"].ToString();
                            user.LastName = reader["LastName"].ToString();
                            user.PhoneNumber = reader["telephone"].ToString();
                            usuarios.Add(user);
                        }

                    }
                }
                var response = new ApiResponse();
                if (usuarios.Count > 0)
                {
                    response.Code = "1";
                    response.Payload = usuarios;
                }
                else
                {
                    response.Code = "0";
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
            var user = new User();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    string query = @"SELECT Id
                    ,address
                    ,email
                    ,FirstName
                    ,LastName
                    ,telephone
                    FROM usuario WHERE Id = @id";
                    var cmd = new SqlCommand(query, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@id", id);
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            user.Id = Convert.ToInt32(reader["Id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["FirstName"].ToString();
                            user.LastName = reader["LastName"].ToString();
                            user.PhoneNumber = reader["telephone"].ToString();
                        }

                    }
                }
                var response = new ApiResponse();
                if (user == null)
                {
                    response.Code = "0";
                    response.Message = "No existe un usuario registrado con este id";
                }
                else
                {
                    response.Code = "1";
                    response.Payload = user;
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
            var usuarios = new List<User>();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    string query = @"SELECT Id
                                    ,address
                                    ,email
                                    ,FirstName
                                    ,LastName
                                    ,telephone
                                    
                                FROM usuario
                                WHERE FirstName LIKE @text_search
                                    OR LastName LIKE @text_search";
                    var cmd = new SqlCommand(query, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@text_search", $"%{textSearch}%");
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new User();
                            user.Id = Convert.ToInt32(reader["Id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["FirstName"].ToString();
                            user.LastName = reader["LastName"].ToString();
                            user.PhoneNumber = reader["telephone"].ToString();
                            usuarios.Add(user);
                        }
                    }
                }
                var response = new ApiResponse();
                if (usuarios.Count > 0)
                {
                    response.Code = "1";
                    response.Payload = usuarios;
                }
                else
                {
                    response.Code = "0";
                    response.Message = "No se encontraron usuarios con estos parametros de bsuqueda";
                }
                return response;
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task<ApiResponse> UpdateAsync(int id, User user)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                string query = @"UPDATE usuario SET address = @address
                                ,FirstName = @FirstName
                                ,LastName = @LastName
                                ,email = @email
                                ,telephone = @telephone
                                WHERE Id = @id";

                var cmd = new SqlCommand(query, conn);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.AddWithValue("@id", user.Id);
                cmd.Parameters.AddWithValue("@address", user.Address ?? "");
                cmd.Parameters.AddWithValue("@FirstName", user.FirstName ?? "");
                cmd.Parameters.AddWithValue("@LastName", user.LastName ?? "");
                cmd.Parameters.AddWithValue("@email", user.Email ?? "");
                cmd.Parameters.AddWithValue("@telephone", user.PhoneNumber ?? "");
                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
            }
            var response = new ApiResponse
            {
                Code = "1",
                Message = "Actualizado Exitosamente"
            };
            return response;
        }
    }

}
