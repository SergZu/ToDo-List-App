import React, { useState } from 'react';
import { TaskElementType } from '../types';
import EditTask from '../EditTask';
import './style.scss';

    const Task = function(props : TaskElementType) {
    const { id, text, complete, mark} = props.data;
    const [ isEdit, toggleEdit ] = useState(false);

    const toggleEditMode = () => {
        toggleEdit((editFlag) => !editFlag)
    }; 

    const layout = isEdit ? (<EditTask data={props.data} target='edit' onSubmitTaskHandler={props.onEditTask} stopEdit={toggleEditMode} />) 
        : (<div className='task' id={id}>
              <div className='task-mark' data-color={mark}></div>
              <div className='task-text'>{text}</div>
              <label className='task-completed' ><input type='checkbox' className='task-checkbox' checked={complete} 
                onChange={props.onChangeHandler} /></label>
              <button className='task-btn__editmode' onClick={toggleEditMode}>Edit</button>
          </div>);
    
    return (
        <>
        {layout}
        </>)
};

export default Task;

