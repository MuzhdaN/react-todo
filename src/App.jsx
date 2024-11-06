import './App.css'

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

function App() {
  return (
    <>
      <h1> Todo List </h1>
      <ul>
        {todoList.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>
        })}
      </ul>
    </>
  )
}

export default App
