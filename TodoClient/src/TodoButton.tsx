import React from 'react'

const TodoButton = (props: TodoButtonInterface) => {

    return (
        <button
            className="todo-button"
            onClick={() => props.getTodos(props.endpoint)}
        >Get more todos
        </button>
    )
}

export default TodoButton

interface TodoButtonInterface {
    endpoint: RequestInfo;
    getTodos: (endpoint: RequestInfo) => void;
}