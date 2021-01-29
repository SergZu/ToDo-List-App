import React from 'react';
import { taskType, options, TaskElementType, TaskListProps } from '../types';
import './style.scss';

const Task = function(props : TaskElementType) {

    const { id, text, complete, mark} = props.data;
    
    return (<div className='task' id={id}>
        <div className='task-mark' data-color={mark}></div>
        <div className='task-text'>{text}</div>
        <label className='task-completed' ><input type='checkbox' className='task-checkbox' checked={complete} 
        onChange={props.onChangeHandler} /></label>
    </div>)
};

const TaskList = function(props : TaskListProps) {

    const markPriorities = {
        red : 0,
        black : 1,
        blue : 2,
        green : 3,
        none : 4,
    };
    
    const onChangeHandler : React.ChangeEventHandler = (evt) => {
        const target  = evt.target.closest('.task');
        if (target !== null) props.setTaskChecked(target.id);
    };

    const createList = (taskData : taskType[] | [], options : options) => {
        let targetArray = [...taskData];
        if (options.currentMark !== '') {
            targetArray = taskData.filter((item) => item.mark === options.currentMark );
        };
        if (options.splited) {
            targetArray.sort((a,b) => {
                const itemA = markPriorities[a.mark];
                const itemB = markPriorities[b.mark];
                return itemA - itemB; 
            });
        };
        if (!options.showCompleted) {
            targetArray = targetArray.filter((item) => !item.complete);
        };
        const result = targetArray.map((item) => (<li key={item.id}><Task data={{ id : item.id, text : item.text, mark : item.mark, complete : item.complete  }} 
            onChangeHandler={onChangeHandler} /></li>) );
        return result
    };

    const layout = (props.tasks.length === 0) ? (<div className='tasklist-placeholder'>Add your first task</div>) : createList(props.tasks, props.viewOptions);

    return (
        <ul className='tasklist'>
            {layout}
        </ul>
    )
};

export default TaskList;

