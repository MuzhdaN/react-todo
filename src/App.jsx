import { useState } from 'react'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList'

function App() {

  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  
  return (
    <>
      <h1> Todo List </h1>
      <AddTodoForm 
        onAddTodo={addTodo}
      />
      <TodoList
        todoList={todoList}
      />
    </>
  )
}

export default App
