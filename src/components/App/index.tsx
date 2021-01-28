import React, { useState } from 'react';
import TaskList from '../TaskList';
import TaskAddForm from '../TaskAddForm';
import { options, taskType } from '../types';

const App = function() {
    const [data, setData] = useState( () : taskType[] =>([
        {text : 'Do anything', id : '1', complete : false, mark : 'none'},
        {text : 'Do anything else', id : '2', complete : false, mark : 'none'}
    ]) );
    const getOptions = () : options => ({
        showCompleted: false,
        splited : false,
        currentMark : 'none',})
    const taskData = data;

    const setTaskChecked = (id : string) : void => {
        const taskData = [...data];
        const targetElement = taskData.find( (item) => item.id === id );
        if (targetElement !== undefined) targetElement.complete = !targetElement.complete; 
        setData(taskData);
    };

    return (
        <>
            <h1>ToDo List</h1>
            <TaskList tasks={taskData} viewOptions={getOptions()} setTaskChecked={setTaskChecked} />
            <TaskAddForm />
        </>
    )
}

export default App;

