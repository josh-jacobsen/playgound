// Import dependencies
import React, { useEffect } from 'react'
import { render } from 'react-dom'

// Import components
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoButton from './TodoButton'

// Import interfaces
import { TodoInterface } from './interfaces';
import TodoPostButton from './TodoPostButton'
import TodoItem from './TodoItem';

export async function http(request: RequestInfo): Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function httpPost(todos: TodoInterface[]): Promise<any> {
  const dummyData: TodoInterface = { id: '1', isCompleted: false, text: 'dummy todo' }
  const dataToSend = { todos }
  const response = await fetch('https://localhost:5001/todos', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todos)
  });
  const body = await response.json();
  return body;
}



const TodoListApp = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([])
  const [todosFromServer, setTodosFromServer] = React.useState<TodoInterface[]>([])

  useEffect(() => {
    async function loadTodos() {
      var todos: TodoInterface[] = await http('https://localhost:5001/todos/get');
      setTodos(todos)
    }
    loadTodos()
  }, []);

  const getTodos = async (endpoint: RequestInfo) => {
    const newTodos: TodoInterface[] = await http(endpoint)
    const currentState: TodoInterface[] = [...todos]
    const existingIds: String[] = currentState.map(x => x.id);
    const newTodosToAdd: TodoInterface[] = [];
    newTodos.forEach(newTodo => {
      if (!existingIds.includes(newTodo.id)) {
        newTodosToAdd.push(newTodo)
      }
    });
    const newState = currentState.concat(newTodosToAdd)
    setTodos(newState)

  }

  const postTodos = async () => {
    console.log('posting')
    const existingTodos: TodoInterface[] = [...todos]
    const responseFromServer: TodoInterface[] = await httpPost(existingTodos);
    setTodos(responseFromServer)
  }

  function handleTodoCreate(todo: TodoInterface) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Update new todos state
    newTodosState.push(todo)

    // Update todos state
    setTodos(newTodosState)
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value

    // Update todos state
    setTodos(newTodosState)
  }

  function handleTodoRemove(id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

    // Update todos state
    setTodos(newTodosState)
  }

  function handleTodoComplete(id: string) {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find the correct todo item and update its 'isCompleted' key
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted

    // Update todos state
    setTodos(newTodosState)
  }

  function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  return (
    <div>
      <div className="todo-list-app">
        {/* Todo form component */}
        <TodoForm
          todos={todos}
          handleTodoCreate={handleTodoCreate}
        />

        {/* Todo list component */}
        <TodoList
          todos={todos}
          handleTodoUpdate={handleTodoUpdate}
          handleTodoRemove={handleTodoRemove}
          handleTodoComplete={handleTodoComplete}
          handleTodoBlur={handleTodoBlur}
        />
        <TodoButton
          endpoint='https://localhost:5001/todos/getmore'
          text="Get more todos"
          getTodos={getTodos} />
        <TodoPostButton
          endpoint='https://localhost:5001/todos'
          text="Post todos"
          postTodos={postTodos} />
        <button
          onClick={() => postTodos()}>
          This is the post button
        </button>
      </div>
    </div>
  )

}
export default TodoListApp