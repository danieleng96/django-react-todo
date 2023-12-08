import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DataPlot from './components/Plotting.js';
import Rect from './components/Rectangles.js'
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faCloudArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isEdited, setIsEdited] = useState([false]);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [green, setGreen] = useState(true);

  // const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/todos/');
        setTodoList(response.data);
      }
      catch (e) {
        console.log('fetch error:',e);
      }
  };
  //handleEdit takes the todo OBJECT
  const handleEdit = (todo) => {
    setIsEdited(todo);
    // setIsNew(false);
    setId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setIsCompleted(todo.completed);
  };

  

  const handleSave = async () => {
    const newItem = { id, title, description, isCompleted };
    if (isEdited) {
      //if the item exists, perform PUT request
      try {
        await axios.put(
          `http://localhost:8000/api/todos/${isEdited.id}/`, newItem);
        setTodoList((prevTodos) =>
          prevTodos.map((todo)=>
            todo.id === isEdited.id ? { ...isEdited, ...newItem } : todo
          )
        );
      } 
      catch (e) {
        console.log('put error:', e);
      }}
      else {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/todos/', newItem);
            setTodoList([...todoList, response.data]);
          } 
          catch (e) {
            console.log('post error:',e)}
            
        
      } 


    setTitle('');
    setDescription('');
    // setIsCompleted(false);
    setIsEdited(null);
    // setIsNew(true);
    };

  const addTodo = () => {
    // setIsNew(true);
    setId(todoList.length+1);
    setTitle('');
    setDescription('');
    // setIsCompleted(false);
    setIsEdited(null);
    };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}/`);
      //remove from state and database
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      
    } catch (e) {
      console.log('delete error:',e)
    }
  };


  const handleToggle = () => {
      setGreen(prevState => !prevState);
      console.log('green', green);
    };
    


  return (
  <div className='gridpage'>
    <Rect/>
    <div className='header'><h1>Header</h1></div>
    <div className="display-container">
      <div className="databox searchbox">
        <h2>{isEdited ? 'Edit Todo' :  'Add todo'}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <input className="check"
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.value)}
        /> */}
        <div className="button-container">
        <div className = 'button' onClick={handleSave}>save</div>
        {isEdited? 
        <div className = 'button' onClick={addTodo}>add</div> : null}
    </div>
    </div>
    

    {/* <h1>Todo List</h1> */}
    <div className="container">
      {todoList.map((todo) => (<div className="databox">
          <div><div className= "id item" key={todo.id}>
            {todo.id}:</div>
              <div className="title item">{todo.title}</div>
          </div>
          <div className="progress-container">  
            <ProgressToggle green={green} handleToggle={handleToggle}/>
            <ProgressToggle green={green} handleToggle={handleToggle}/>
            <ProgressToggle green={green} handleToggle={handleToggle}/>
            </div>
          <div className="description item"><p>{todo.description}</p></div>
          {/* <div className="completed item">Completed?<input className="check"
        type="checkbox"
        checked={todo.completed}
      /></div> */}
          <div className = "button-container">
            <div className = 'button small-button'  onClick={() => handleEdit(todo)}>Edit</div>
            <div className = 'button small-button'  onClick={() => handleDelete(todo.id)}>Remove</div>
            </div>
            </div>
          


      ))}
            </div>

    
          
    </div>
    <div className="plot-wrapper">
      {/* <h1>Data Plotting</h1> */}
      <DataPlot data={todoList}/>
    
    
    </div>
    

      <div id="footer" className='footer'></div>
  </div>
);
};

export default App;
// 