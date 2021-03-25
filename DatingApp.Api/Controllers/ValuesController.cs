using System.Linq;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _dataBaseContext;

        public ValuesController(DataContext dataBaseContext)
        {
            _dataBaseContext = dataBaseContext;
        }

        
        [HttpGet("get")]
        public IActionResult get()
        {


            return Ok(_dataBaseContext.Values.ToList());
        }

    }
}