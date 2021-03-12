import React from 'react';
import EditTask from '../EditTask';
import { TaskAddFormProps } from '../types';

const TaskAddForm = function(props : TaskAddFormProps) {
    const { nextId, addTask, toggleMode, currentDate } = props;
    const initTask = (id : string) => ({
        id,
        text : '',
        complete : false,
        category : '',
        important : false,
        expiredDate : ''
    });
    return (
        <>
            <EditTask task={ initTask(nextId) } addTask={addTask} toggleMode={toggleMode} currentDate={currentDate} />   
        </>
    )
}

export default TaskAddForm

 