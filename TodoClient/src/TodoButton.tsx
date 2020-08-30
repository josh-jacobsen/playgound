import React from 'react'

const TodoButton = (props: TodoButtonInterface) => {

    return (
        <button
            className="todo-button"
            onClick={() => props.getTodos(props.endpoint)}
        >{props.text}
        </button>
    )
}

export default TodoButton

interface TodoButtonInterface {
    text: String;
    endpoint: RequestInfo;
    getTodos: (endpoint: RequestInfo) => void;
}