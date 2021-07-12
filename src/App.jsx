import React, {Component, Fragment, useState, useRef, useEffect} from 'react';
import reactDom from 'react-dom';
import {TodoList} from './components/TodoList.jsx';
import {v4 as uuidv4} from 'uuid';

const KEY = "todoApp.todos";

export function App(){
    const [todos, setTodos] = useState([
        {id: 1, task: "tarea 1", completed: false}
    ]);
    const todoTaskRef = useRef();
    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    },[todos]);
const toggleTodo = (id) =>{
const newTodos = [...todos]; //expres operator se hace una copia rapida de un array ejemplo [...todos].
const todo = newTodos.find((todo) => todo.id == id);
todo.completed = !todo.completed;
setTodos(newTodos);
};

    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task == "" ) return;

        setTodos((prevtodos) => {
            return[...prevtodos, {id: uuidv4(),task, completed: false}];
        });

        todoTaskRef.current.value = null;
    };
    const handleTodoClearAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);

    }
    return (
    <React.Fragment> 
          <TodoList todos={todos} toggleTodo={toggleTodo}  />
       <div align="center" > <input ref={todoTaskRef} type="text" placeholder="nueva tarea"/><button onClick={handleTodoAdd}>+</button> <br/>  
        <input ref={todoTaskRef} type="text" placeholder="nueva tarea"/><button onClick={handleTodoAdd}>+</button> <br/>  
        <input ref={todoTaskRef} type="text" placeholder="otra vaina"/>   
        <button onClick={handleTodoAdd}>+</button> 
        <button onClick={handleTodoClearAll}> pp </button>
        <div>te quedan {todos.filter((todo)=>! todo.completed).length} tareas por terminar </div>
        </div>
    </React.Fragment>
    ); 
   
}