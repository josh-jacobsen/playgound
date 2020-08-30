using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
            var a = new Todo { Id = GenerateId(), Text = "Implement a button to get additional todos from server", IsCompleted = false };
            var b = new Todo { Id = GenerateId(), Text = "Post todos from frontend to server", IsCompleted = false };
            var c = new Todo { Id = GenerateId(), Text = "From server three", IsCompleted = false };
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
            var a = new Todo { Id = GenerateId(), Text = "More todos from the server 1", IsCompleted = false };
            var b = new Todo { Id = GenerateId(), Text = "More todos from the server 2", IsCompleted = false };
            var c = new Todo { Id = GenerateId(), Text = "More todos from the server 3", IsCompleted = false };
            var collection = new List<Todo>();
            collection.Add(a);
            collection.Add(b);
            collection.Add(c);

            return collection;
        }

        // todos/getmore
        [HttpPost]
        // [Route("GetMore")]
        public ActionResult<IList<Todo>> PostTodo(IList<Todo> todos)
        {
            var currentTodos = new List<Todo>();
            currentTodos.AddRange(todos);
            var c = new Todo { Id = GenerateId(), Text = "More todos from the server 3", IsCompleted = false };
            currentTodos.Add(c);

            return CreatedAtAction(nameof(Get), currentTodos);
        }

        public string GenerateId()
        {
            return Guid.NewGuid().ToString("N");
        }

    }

    public class Todo
    {
        public string Id { get; set; }
        public string Text { get; set; }

        public bool IsCompleted { get; set; }

    };


}
