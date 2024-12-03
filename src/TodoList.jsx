import TodoListItem from "./TodoListItem"

const todoList = [
    {
      id: 1, 
      title: 'Complete assignment',
    },
    {
      id: 2,
      title: "Call mom",
    },
    {
      id: 3, 
      title: 'Clean the kitchen',
    }
]

function TodoList() {
    return (
      <>
        <ul>
            {todoList.map((todo) => {
                return (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                  />
                )
            })}
        </ul>

      </>
    )
}  

export default TodoList