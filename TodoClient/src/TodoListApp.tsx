// Import dependencies
import  React, {useEffect} from 'react'
import { render } from 'react-dom'

// Import components
import TodoForm from './TodoForm'
import TodoList from './TodoList'

// Import interfaces
import { TodoInterface } from './interfaces'

const TodoListApp = () => {
    const [todos, setTodos] = React.useState<TodoInterface[]>([])
    const [todosFromServer, setTodosFromServer] = React.useState<TodoInterface[]>([])

    useEffect(() => {
      console.log('Component mounted; calling API');
      fetch('https://localhost:5001/todos')
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response => setTodos(response))
        .catch(error => console.log(error));
    }, []);

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
        </div>
      )

}
export default TodoListApp