// import ProgressToggle from './ProgessToggle'
import DateTimePicker from './Datetime.js'
import { useState, useEffect } from 'react';
import  Tags  from './Tags'



const TodoItem = ({ todo, handleSave, handleDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);
    const [editedGoalTime, setEditedGoalTime] = useState(todo.goal_time)
    
    const [done, setDone] = useState(false);
    const [tag, setTag] = useState(todo.tag); // Add a tagKey state

    const handleDoubleClick = () => {
        setIsEditing(prevState => !prevState);
        // setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(todo.title);
        setEditedDescription(todo.description);
        setEditedGoalTime(todo.goal_time)
      };

    // const handleSave = (e) => {
    //     handleEdit({
    //         ...todo,
    //         title: editedTitle,
    //         description: editedDescription,
    //       });
    //       setIsEditing(false);
    // }


    const handleToggle = () => {
        setDone(prevState => !prevState);
        };

    const handleTag = (enabledTag) => {
        setTag(enabledTag);
        };
    // console.log({ ...todo, title: editedTitle, description: editedDescription })


    const dateConversion = (elapsed) => {

        return (
            Math.abs(elapsed) < 60 ? 'just now' : // if 
            (Math.abs(elapsed) >= 60 && Math.abs(elapsed) < 3600) ? String(Math.round(elapsed/60))+' minutes' : // else if 
            (Math.abs(elapsed) >= 3600 && Math.abs(elapsed) < 3600*24) ? String(Math.round(elapsed/3600))+' hours': // else if
            Math.abs(elapsed) >= 3600*24 ? String(Math.round(elapsed/3600))+' days': null // else if
          );

    }

    

    const formatDate = (date, message) => {
        let objectDate = new Date(date);
        let elapsed = (new Date()- objectDate) / 1000;
        
        console.log(elapsed)
        const locale = 'en-US';
        let weekday = objectDate.toLocaleDateString('default', {weekday: 'long'});
        let month = objectDate.getMonth()+1;
        let year = objectDate.getYear()+1900;
        let day = objectDate.getDate();
        let time = objectDate.toLocaleString('default', {
            hour: '2-digit',
            minute: '2-digit'
        })
        return (
            <div>
                <h2>{message}</h2>
                <p>{weekday}<br></br>{day}-{month}-{year}<br/><br/>
                 {time}<br></br>
                 {/* Elapsed time since goal created {dateConversion(elapsed)} ago. */}
                {/* <h2>{objectDate}</h2> */}
                </p>
            </div>
        )
    }

      return (
        <div className={`databox ${isEditing ? 'editing' : ''}`} onDoubleClick={handleDoubleClick}>
          {!isEditing ? (
            // Use the tagKey as the key prop for the Tags component
            <div>
              <div className="box-header">
                <div className="id" key={todo.id}>
                  {todo.id}
                </div>
                <Tags editMode={isEditing} handleTag={handleTag} />

                <div className="title item">{todo.title}</div>

              </div>

              <label>Description</label>

              <div className="description item">
                <p>{todo.description}</p>
              </div>
              <div className="inputtime item">{formatDate(todo.input_time, 'Creation time:')}</div>
              <div className="goaltime item">{formatDate(todo.goal_time, 'Goal time:')}</div>

              {/* <div className="completed item">{todo.completed.toString()}</div> */}

              {/* <div className="progress-container">
                <ProgressToggle done={done} handleToggle={handleToggle} />
              </div> */}
              
    
              <div className="button-container">
                <div className="button small-button" onClick={() => handleDelete(todo.id)}>
                  Remove
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="box-header">
                <div className="id" key={todo.id}>
                  {todo.id}
                </div>
                <Tags editMode={isEditing} handleTag={handleTag} />
                </div>
                <label>Title</label>
              <input
                className="id item"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
                <label>Description</label>

              <input
                className="description item"
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            <label>Goal Time</label>

              {/* <input type="datetime-local" 
                    id="goaltime"
                    name="goaltime"
                    value = {editedGoalTime}
                    min= { String(new Date())} max="" */}
                    <DateTimePicker
                    value = {editedGoalTime}
                    onChange={(e) => setEditedGoalTime(e.target.value)}/>
                    
              <div className="button-container">
                <div className="button small-button" onClick={() => handleSave({ ...todo, title: editedTitle, description: editedDescription, goal_time: editedGoalTime, tags: tag })}>
                  Save
                </div>
                <div className="button small-button" onClick={handleCancel}>
                  Cancel
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default TodoItem;
    