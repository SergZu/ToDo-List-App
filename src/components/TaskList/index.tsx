import React, { useState } from 'react';
import { taskType, options, TaskElementType, TaskListProps } from '../types';
import './style.scss';

const Task = function(props : TaskElementType) {
    const [completed, setTaskComplete] = useState(props.data.complete);

    const onChangeHandler : React.ChangeEventHandler = (evt) => {
        setTaskComplete(!completed);
        const target  = evt.target;
        props.completeTaskClickHandler(target);
    };

    return (<div className='task' id={props.data.id}>
        <div className='task-mark' data-color={props.data.mark}></div>
        <div className='task-text'>{props.data.text}</div>
        <label className='task-completed' ><input type='checkbox' className='task-checkbox' checked={completed} 
        onChange={onChangeHandler} /></label>
    </div>)
};

const TaskList = function(props : TaskListProps) {
    const completeTaskClickHandler = (target : Element ) : void => {
        const targetElement  = target.closest('.task');
        if (targetElement !== null) props.setTaskChecked(targetElement.id);
    };

    const createList = (taskData : taskType[] | [], options : options) => {
        let targetArray = [...taskData];
        console.log(options);
        if (options.currentMark !== 'none') {
            targetArray = taskData.filter((item) => item.mark === options.currentMark );
        };
        if (options.splited) {
            targetArray.sort((a,b) => ( a.mark !== b.mark ) ? 1 : 0 );
        };
        if (!options.showCompleted) {
            targetArray = targetArray.filter((item) => !item.complete);
            console.log(targetArray);
        };
        const result = targetArray.map((item) => (<li key={item.id}><Task data={{ id : item.id, text : item.text, mark : item.mark, complete : item.complete  }} 
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

