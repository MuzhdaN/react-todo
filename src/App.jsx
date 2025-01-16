import { useEffect, useState } from 'react'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList'

// <<<<<<< lesson_1_1

// const todoList = [
//   {
//     id: 1, 
//     title: 'Complete assignment',
//   },
//   {
//     id: 2,
//     title: "Call mom",
//   },
//   {
//     id: 3, 
//     title: 'Clean the kitchen',
//   }
// ]
// =======
function useSemiPersistentState(){

  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);

  useEffect(() => {

   localStorage.setItem('savedTodoList', JSON.stringify(todoList));

  }, [todoList]);

  return [todoList, setTodoList]
}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    const newTodoList = todoList.filter((todo) => todo.id !==id);
    setTodoList(newTodoList)
  }
  
  return (
    <>
      <h1> Todo List </h1>
      <AddTodoForm 
        onAddTodo={addTodo}
      />
      <TodoList
        todoList={todoList}
        onRemoveTodo={removeTodo}
      />
    </>
  )
}

export default App
