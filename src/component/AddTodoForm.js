import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddTodoForm({getAllTodos}) {

    const [todoName, setTodoName] = useState('');
    const [error,setError] = useState(null)

    const addTodo = async ()=>{
      const response = await fetch('http://localhost:5000/tasks',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: todoName})
        })

        const data = await response.json()
        console.log(data);
        setTodoName('')
        getAllTodos()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!todoName){
            setError('Todo name is required')
            return
        }
        setError(null)
        addTodo()
    }

    return (
        <div>
            <Stack gap={2} className="col-md-5 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="inputPassword5">Todo Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="todoName"
                        aria-describedby="add new todo"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <Button type='submit' variant="primary">Add Todo</Button>
                </Form>

            </Stack>
        </div>
    )
}
