import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import './App.css'
import TodoList from './TodoList'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  
  // useEffect(() => {
  //   if (!isLoading) {
  //     localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  //   }
  // }, [todoList]);


  async function addTodo(newTodo) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            title: newTodo.title,
          },
        }),
      };
  
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.status);
      }
  
      const data = await response.json();
 
      const airtableId = data.id;
  
      //update the newTodo object with the airtable id
      newTodo.id = airtableId;
  
      setTodoList([...todoList, newTodo]);
  
    } catch (error) {
      console.error("Error adding todo item:", error);
    }
  }

  async function removeTodo(id) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };
  
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`; // 

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const newTodoList = todoList.filter((todo) => todo.id !==id);
      setTodoList(newTodoList)
  
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
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
        }/>
        <Route path='/new' element={<h1>New Todo List</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
