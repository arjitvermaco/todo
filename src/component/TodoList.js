import React, { useEffect, useState } from 'react'

export default function TodoList({ loading, todos, error,getAllTodos }) {


    if (loading) {
        return <div>Loading...</div>

    }

    async function updateTodoStatus(id,completed) {
      const response = await fetch("http://localhost:5000/tasks/"+id, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({completed: !completed})
      })
      const data = await response.json()
      getAllTodos()
    }

    async function deleteTodo(id) {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
    getAllTodos()
    }

    return (
        <div>
            Todo List

            {todos.map((todo) => {
                return <div style={{textDecoration: todo.completed ? 'line-through':'none'}}
                 key={todo._id}>{todo.name} 
                <button onClick={()=>{updateTodoStatus(todo._id,todo.completed)}}>{todo.completed? "Mark Incomplete":"Mark Complete"}</button>
                 

                <button onClick={()=>{deleteTodo(todo._id)}}>Delete Todo</button></div>
            })}
        </div>
    )
}
