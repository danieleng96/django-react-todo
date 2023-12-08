import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rect from './Rectangles.js';
import DataPlot from './Plotting.js';
import TodoItem from './TodoItem.js';
import Sidebar from './Collapsible.js';
// import GanttChart from './Gantt.js';
//can add a grouping specific value

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [startTime, setStartTime] = useState(false);
    const [goalTime, setGoalTime] = useState(false);
    const [finishTime, setFinishTime] = useState(false); 

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


        const handleSave = async (editedTodo) => {
            try {
              if (editedTodo.id) {
                await axios.put(`http://localhost:8000/api/todos/${editedTodo.id}/`, editedTodo);
                console.log('item put',editedTodo)
                setTodoList(prevTodos =>
                  prevTodos.map(todo => (todo.id === editedTodo.id ? editedTodo : todo))
                );

              } else {
                // Save new item
                console.log('item',editedTodo)

                const response = await axios.post('http://localhost:8000/api/todos/', editedTodo);
                setTodoList([...todoList, response.data]);
              }
            } catch (e) {

              console.log('save error:', e, editedTodo);
            }
          };


        const handleSaveNew = () => {
            const newItem = { title, description, isCompleted, goal_time: goalTime };
            setId(id);
            setTitle(title);
            setDescription(description);
            setGoalTime(goalTime);
            setIsCompleted(isCompleted);
            handleSave(newItem);
        
            setTitle('');
            setDescription('');
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

    const ganttData = [
      {
        label: 'Task 1',
        start: new Date('2023-08-21'),
        end: new Date('2023-09-28'),
        color: 'blue',
        text: 'Task 1 details'
      },
      {
        label: 'Task 2',
        start: new Date('2023-07-25'),
        end: new Date('2023-08-05'),
        color: 'green',
        text: 'Task 2 details'
      }
      // Add more tasks as needed
    ];
  
  
  
  
  
  


        return(
            <div className='gridpage'>
            <Rect/>
            <div className='header'><h1>規</h1></div>
                <div className="display-container">
                    <div className="databox searchbox">
                    {/* <h2>{isEdited ? 'Edit Todo' :  'Add todo'}</h2> */}
                    <h1>Add todo</h1>

                    <label for='title'>Title</label>
                    <input
                    id='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for='description'>Description</label>
                    <input
                    id='description'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <input className="check"
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.value)}
                    />
                     <input type="datetime-local" 
                    id="goaltime"
                    name="goaltime"
                    value = {goalTime}
                    onChange={(e) => setGoalTime(e.target.value)}></input>
                    
                    <div className="button-container">
                    <div className = 'button' onClick={handleSaveNew}>save new</div>
                    </div>
                    </div>
                

                {/* <h1>Todo List</h1> */}
                <div className="container">
                {todoList.map((todo) => 
                    (<Sidebar><TodoItem 
                        key={todo.id}
                        todo={todo}
                        handleSave = {handleSave}
                        handleDelete = {handleDelete}/>
                        </Sidebar>
                ))}
                        </div>

            
                
            </div>
            <div className="plot-wrapper">
      {/* <h1>Data Plotting</h1> */}
      <DataPlot data={todoList} handleSave = {handleSave} handleDelete = {handleDelete}/>
      {/* <GanttChart data={ganttData}></GanttChart> */}
    
    </div>
    

      <div id="footer" className='footer'></div>
  </div>
        )
    };

export default TodoList;