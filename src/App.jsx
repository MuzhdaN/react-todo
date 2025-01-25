import { useEffect, useState } from 'react'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    // Create a new async function fetchData
  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
  
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title,
        }));

        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

   useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

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
      {isLoading ? (<p>Loading...</p>) 
      : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
        />
      )}
    </>
  )
}

export default App
