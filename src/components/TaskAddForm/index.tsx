import React from 'react';
import EditTask from '../EditTask';
import { TaskAddFormProps } from '../types';

const TaskAddForm = function({ 
                                nextId, 
                                addTask, 
                                toggleMode, 
                                currentDate 
                            } : TaskAddFormProps) {
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
            <EditTask 
                        task={ initTask(nextId) } 
                        addTask={addTask} 
                        toggleMode={toggleMode} 
                        currentDate={currentDate} 
             />   
        </>
    )
}

export default TaskAddForm

 
