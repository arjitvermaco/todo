import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import AddTodoForm from './component/AddTodoForm';
import TodoList from './component/TodoList';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  async function getAllTodos() {
    const response = await fetch("http://localhost:5000/tasks")
    const data = await response.json()
    console.log(data)
    setTodos(data.tasks)
    setLoading(false)
  }

  useEffect(() => {
    getAllTodos()
  }, [])
  return (
    <div className="App">
      <AddTodoForm getAllTodos={getAllTodos} />
      <TodoList todos={todos} loading={loading} error={error} getAllTodos={getAllTodos} />
    </div>
  );
}

export default App;
