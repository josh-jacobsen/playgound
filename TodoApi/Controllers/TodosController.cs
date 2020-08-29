using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ILogger<TodosController> _logger;

        public TodosController(ILogger<TodosController> logger)
        {
            _logger = logger;
        }

        // todos/get
        [HttpGet]
        [Route("Get")]
        public IList<Todo> Get()
        {
            var a = new Todo { Id = "1", Text = "Implement a button to get additional todos from server", IsCompleted = false };
            var b = new Todo { Id = "2", Text = "Post todos from frontend to server", IsCompleted = false };
            var c = new Todo { Id = "3", Text = "From server three", IsCompleted = false };
            var collection = new List<Todo>();
            collection.Add(a);
            collection.Add(b);
            collection.Add(c);

            return collection;
        }

        // todos/getmore
        [HttpGet]
        [Route("GetMore")]
        public IList<Todo> GetMore()
        {
            var a = new Todo { Id = "11", Text = "More todos from the server 1", IsCompleted = false };
            var b = new Todo { Id = "12", Text = "More todos from the server 2", IsCompleted = false };
            var c = new Todo { Id = "13", Text = "More todos from the server 3", IsCompleted = false };
            var collection = new List<Todo>();
            collection.Add(a);
            collection.Add(b);
            collection.Add(c);

            return collection;
        }

    }

    public class Todo
    {
        public string Id { get; set; }
        public string Text { get; set; }

        public bool IsCompleted { get; set; }

    };

}
