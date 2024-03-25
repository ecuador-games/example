using example.API.Interfaces;
using example.API.Models;
using Npgsql;

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
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                string query = @"INSERT INTO usuario(address, email, first_name, last_name, password, telephone)
                            VALUES(@address, @email, @first_name, @last_name, @password, @telephone)";
                var cmd = new NpgsqlCommand(query, conn);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.AddWithValue("@address", user.Address ?? "");
                cmd.Parameters.AddWithValue("@email", user.Email);
                cmd.Parameters.AddWithValue("@first_name", user.FirstName);
                cmd.Parameters.AddWithValue("@last_name", user.LastName);
                cmd.Parameters.AddWithValue("@password", user.Password);
                cmd.Parameters.AddWithValue("@telephone", user.Telephone ?? "");
                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
            }
            var response = new ApiResponse
            {
                Code = "1",
                Message = "Insertado correctamente"
            };
            return response;
        }

        public async Task<ApiResponse> DeleteAsync(int id)
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                string query = @"DELETE FROM usuario WHERE user_id = @id";
                var cmd = new NpgsqlCommand(query, conn);
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
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    string query = @"select * from usuario order by user_id desc";
                    var cmd = new NpgsqlCommand(query, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new User();
                            user.Id = Convert.ToInt32(reader["user_id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["first_name"].ToString();
                            user.LastName = reader["last_name"].ToString();
                            user.Telephone = reader["telephone"].ToString();
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
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    string query = @"SELECT user_id
                    ,address
                    ,email
                    ,first_name
                    ,last_name
                    ,telephone
                    FROM usuario WHERE user_id = @id";
                    var cmd = new NpgsqlCommand(query, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@id", id);
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            user.Id = Convert.ToInt32(reader["user_id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["First_name"].ToString();
                            user.LastName = reader["last_name"].ToString();
                            user.Telephone = reader["telephone"].ToString();
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
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    string query = @"SELECT user_id
                                    ,address
                                    ,email
                                    ,first_name
                                    ,last_name
                                    ,telephone
                                    
                                FROM usuario
                                WHERE first_name ILIKE @text_search
                                    OR last_name ILIKE @text_search";
                    var cmd = new NpgsqlCommand(query, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Parameters.AddWithValue("@text_search", $"%{textSearch}%");
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new User();
                            user.Id = Convert.ToInt32(reader["user_id"]);
                            user.Address = reader["address"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["first_name"].ToString();
                            user.LastName = reader["last_name"].ToString();
                            user.Telephone = reader["telephone"].ToString();
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
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                string query = @"UPDATE usuario SET address = @address
                                ,first_name = @first_name
                                ,last_name = @last_name
                                ,email = @email
                                ,telephone = telephone
                                WHERE user_id = @id";

                var cmd = new NpgsqlCommand(query, conn);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.AddWithValue("@id", user.Id);
                cmd.Parameters.AddWithValue("@address", user.Address ?? "");
                cmd.Parameters.AddWithValue("@first_name", user.FirstName ?? "");
                cmd.Parameters.AddWithValue("@last_name", user.LastName ?? "");
                cmd.Parameters.AddWithValue("@email", user.Email ?? "");
                cmd.Parameters.AddWithValue("@telephone", user.Telephone ?? "");
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
