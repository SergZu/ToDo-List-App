import React from 'react';
import { task, options, Task, TaskListProps } from '../types';
import './style.css';

const Task = function(props : Task) {
    
    return (<div className='task' id={props.data.id}>
        <div className='task-mark' data-color={props.data.mark}></div>
        <div className='task-text'>{props.data.text}</div>
        <label className='task-completed' ><input type='checkbox' className='task-checkbox' checked={props.data.complete} 
        onChange={props.completeTaskClickHandler} /></label>
    </div>)
};

const TaskList = function(props : TaskListProps) {

    const completeTaskClickHandler : React.ChangeEventHandler = (evt) => {
        const targetElement  = evt.target.closest('.task');
        if (targetElement !== null) props.setTaskChecked(targetElement.id);
    };

    const createList = (taskData : task[] | [], options : options) => {
        let targetArray = [...taskData];
        if (options.currentMark !== 'none') {
            targetArray = taskData.filter((item) => item.mark === options.currentMark );
        };
        if (options.splited) {
            targetArray.sort((a,b) => ( a.mark !== b.mark ) ? 1 : 0 );
        };
        if (!options.showCompleted) {
            targetArray = targetArray.filter((item) => !item.complete);
        };
        const result = targetArray.map((item, indx) => (<li key={taskData[indx].id}><Task data={taskData[indx]} 
            setTaskChecked={props.setTaskChecked} completeTaskClickHandler={completeTaskClickHandler} /></li>) );
        return result
    };

    return (
        <ul>
            {createList(props.tasks, props.viewOptions)}
        </ul>
    )
};

export default TaskList;

