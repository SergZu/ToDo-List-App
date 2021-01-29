import React from 'react';
import { taskType, options, TaskElementType, TaskListProps } from '../types';
import './style.scss';

const Task = function(props : TaskElementType) {
    //const [completed, setTaskComplete] = useState(props.data.complete);

    const { id, text, complete, mark} = props.data;
    
    return (<div className='task' id={id}>
        <div className='task-mark' data-color={mark}></div>
        <div className='task-text'>{text}</div>
        <label className='task-completed' ><input type='checkbox' className='task-checkbox' checked={complete} 
        onChange={props.onChangeHandler} /></label>
    </div>)
};

const TaskList = function(props : TaskListProps) {
    
    const onChangeHandler : React.ChangeEventHandler = (evt) => {
        const target  = evt.target.closest('.task');
        if (target !== null) props.setTaskChecked(target.id);
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
            onChangeHandler={onChangeHandler} /></li>) );
        return result
    };

    return (
        <ul>
            {createList(props.tasks, props.viewOptions)}
        </ul>
    )
};

export default TaskList;

