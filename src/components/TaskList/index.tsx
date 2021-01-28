import React from 'react';
import { task, options } from '../types';
import './style.css';

interface Task {
    data : task;
    completeTaskClickHandler : React.ChangeEventHandler<HTMLInputElement>;
}

interface TaskListProps {
    tasks : task[] | [];
    viewOptions : options;
    setTaskChecked : (id : string) => void;
} 

const Task = function(props : Task) {
    const id = props.data.id;
    const completeTaskClickHandler : React.ChangeEventHandler = () => {
        props.setTaskChecked(id);
    };
    return (<div className='task'>
        <div className='task-mark' data-color={props.data.mark}></div>
        <div className='task-text'>{props.data.text}</div>
        <label className='task-completed' ><input type='checkbox' id='task-checkbox' checked={props.data.complete} 
        onChange={completeTaskClickHandler} /></label>
    </div>)
};

const TaskList = function(props : TaskListProps) {


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
            setTaskChecked={props.setTaskChecked} /></li>) );
        return result
    };

    return (
        <ul>
            {createList(props.tasks, props.viewOptions)}
        </ul>
    )
};

export default TaskList;

