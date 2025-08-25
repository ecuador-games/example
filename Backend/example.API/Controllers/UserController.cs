using example.API.DTOs;
using example.API.DTOs.Requests;
using example.API.Interfaces;
using example.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace example.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            try
            {
                var response = await _userService.GetAsync();
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            
            try
            {
                var response = await _userService.GetByIdAsync(id);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search(string textSearch)
        {
            
            try
            {
                var response = await _userService.SearchAsync(textSearch);
                    return Ok(response);
                

            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateUserDto createUserDto)
        {
            try
            {
                var response = await _userService.AddAsync(createUserDto);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            try
            {
                var response = await _userService.UpdateAsync(id, updateUserDto);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var response = await _userService.DeleteAsync(id);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}