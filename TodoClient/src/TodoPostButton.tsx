import React from 'react'
import { TodoInterface } from './interfaces';



const TodoPostButton = (props: TodoPostButtonInterface) => {

    return (
        <button
            className="todo-button"
            onClick={() => props.postTodos()}
        >{props.text}
        </button>
    )
}

export default TodoPostButton

interface TodoPostButtonInterface {
    text: String;
    endpoint: RequestInfo;
    postTodos: () => void;
}