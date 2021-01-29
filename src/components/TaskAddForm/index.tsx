import React from 'react';
import EditTask from '../EditTask';
import { taskType, TaskAddFormProps } from '../types';

const TaskAddForm = function(props : TaskAddFormProps){
    const taskInit : taskType = {
        id : props.currentId,
        text : '',
        mark : 'none',
        complete : false
    };
    return (
        <>
            <EditTask data={taskInit} onSubmitTaskHandler={props.addTask} target='add' />
        </>
    )
};

export default TaskAddForm;


 