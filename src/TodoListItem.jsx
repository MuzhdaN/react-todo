function TodoListItem({todo, onRemoveTodo}) {
    return(   
        <li> 
            {todo.title}
            <button onClick={() => onRemoveTodo(todo.id)}> Remove </button>
        </li>
    )
}

export default TodoListItem