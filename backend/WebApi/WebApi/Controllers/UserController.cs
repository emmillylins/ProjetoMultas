using Domain.Interfaces;
using UserClass.Entities;
using UserClass.Services;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dto;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IBaseService<User> _baseUserService;

        public UserController(IBaseService<User> baseUserService)
        {
            _baseUserService = baseUserService;
        }

        [HttpPost]
        public IActionResult Create(CreateUserDto user)
        {
            if (user == null)
                return NotFound();

            return Execute(() => _baseUserService.Add<CreateUserDto, UserDto, UserValidator>(user));
        }

        [HttpPut]
        public IActionResult Update(UserDto user)
        {
            if (user == null)
                return NotFound();

            return Execute(() => _baseUserService.Update<UserDto, UserDto, UserValidator>(user));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id == 0)
                return NotFound();

            Execute(() =>
            {
                _baseUserService.Delete(id);
                return true;
            });
            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => _baseUserService.Get<UserDto>());
        }

        private IActionResult Execute(Func<object> func)
        {
            try
            {
                var result = func();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

