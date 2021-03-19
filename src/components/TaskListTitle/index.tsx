import React, {useState} from 'react';
import TaskAddForm from '../TaskAddForm';
import { TaskListTitleProps } from '../types';
import {formatDate} from '../../dateUtils';
import './styles.scss';

const TaskListTitle = function(props : TaskListTitleProps) {
    const {currentFilter, currentDate, addTask, searchQuery, makeQuery, nextId} = props;
    const [ addTaskMode, switchAddTaskMode ] = useState(false);
    const toggleMode = () => {
        switchAddTaskMode( (modeState) => !modeState );
    }
    const onSearchChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        makeQuery(evt.currentTarget.value);
    };
    const onAddTaskClickHandler : React.MouseEventHandler = () => {
        toggleMode();
    };
    const onAddTaskKeyPressedHandler : React.KeyboardEventHandler = (evt) => {
        if (evt.key === 'Enter') toggleMode();
    };

    const filterName = currentFilter !== 'All' ? currentFilter : 'My Tasks';
    const formatedDate = formatDate(currentDate);
    const listTitleClass = addTaskMode ? 'TaskListTitle open' : 'TaskListTitle';
    const restLayout = addTaskMode ? (<TaskAddForm nextId={nextId} addTask={addTask} toggleMode={toggleMode} currentDate={currentDate} />) 
    : (<><input className='TaskListTitle-search' type='text' value={searchQuery}
        onChange={onSearchChangeHandler} placeholder={`Find in ${filterName}`} />
        <button className='TaskListTitle-add' onClick={onAddTaskClickHandler} onKeyPress={onAddTaskKeyPressedHandler}>Add Task</button></>); 

    return (
        <div className={listTitleClass}>
           <h3 className='TaskListTitle-name'>{filterName}</h3>
           <div className='TaskListTitle-time'>
                <span>{formatedDate[0]}</span>
                <span>{formatedDate[1]}</span>  
            </div>
           {restLayout} 
        </div>
    )
}

export default TaskListTitle
