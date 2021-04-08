import React, { useState } from 'react';
import { TaskElementType } from '../types';
import {computeTimeDiff} from '../../dateUtils';
import EditTask from '../EditTask';
import './style.scss';

    const Task = function({ taskData, editTask, deleteTask, setTaskChecked, currentDate } : TaskElementType) {
    const [editMode, toggleEditMode] = useState(false);
 
    const { text, complete, important, id, expiredDate } = taskData;
    const toggleMode = () => {toggleEditMode((e) => !e)};
    const onCompleteHandler = () => { setTaskChecked(id) };
    const onCompleteKeyPressHandler : React.KeyboardEventHandler = (evt) => {
        if (evt.key === 'Enter') setTaskChecked(id)
    }; 
    const onEditTaskHandler = () => { toggleMode() };
    const onDeleteTaskHandler = () => { deleteTask(id) };

    const remainTime = expiredDate !== '' ? computeTimeDiff(Number(expiredDate)) : '';     
    const importantFlagClass = important ? 'task-element-important' : 'task-element-common';
    const remainTimeblockClass = remainTime.length !== 0 ? 'task-element-date' : 'hidden';
    const taskCheckboxClass = complete ? 'taskCheckbox taskChecked' : 'taskCheckbox';

    const editModeLayout = (
            <EditTask toggleMode={toggleMode} currentDate={currentDate} task={taskData} editTask={editTask} />
    );
    const taskElementLayout = (
                <div className='task-element'>
                                <div className={importantFlagClass}></div>
                                <span className={taskCheckboxClass} role='checkbox' aria-checked={complete} aria-labelledby={`taskElement-${id}`} 
                                onClick={onCompleteHandler} onKeyPress={onCompleteKeyPressHandler} tabIndex={0} />
                                <label className='task-element-text' id={`taskElement-${id}`} onClick={onCompleteHandler}>{text}</label>
                                <div className='task-elemen-btns'>
                                        <span className={remainTimeblockClass}>{remainTime}</span>
                                        <button className='task-element-btn__edit' onClick={onEditTaskHandler}></button>
                                        <button className='task-element-btn__delete' onClick={onDeleteTaskHandler}></button>
                                </div>
               </div>)

    const resultLayout = editMode ? editModeLayout : taskElementLayout;

    return (<>
            {resultLayout}
        </>)
};

export default Task;

