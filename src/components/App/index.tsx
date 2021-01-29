import React, { useState } from 'react';
import TaskList from '../TaskList';
import TaskAddForm from '../TaskAddForm';
import TaskListFilter from '../TaskListFilter';
import { options, taskType } from '../types';

const App = function() {

    const [data, setData] = useState( () : taskType[] =>([
        {text : 'Do anything', id : '1', complete : false, mark : 'none'},
        {text : 'Do anything else', id : '2', complete : true, mark : 'blue'},
        {text : 'You spin me ...', id : '3', complete : false, mark : 'none'},
        {text : 'Right now, baby right now', id : '4', complete : true, mark : 'red'},
    ]) );

    const [optionsData, setOptionsData] = useState( () : options =>({
        showCompleted: false,
        splited : false,
        currentMark : '',
    }) );

    const setTaskChecked = (id : string) => {
        const taskData = [...data];
        const targetElement = taskData.find( (item) => item.id === id );
        if (targetElement !== undefined) targetElement.complete = !targetElement.complete; 
        setData(taskData);
    };

    const changeOptions = (newOptions : options) => {
        setOptionsData(newOptions);
    };

    return (
        <div className='TaskListApp'>
            <h1>ToDo List</h1>
            <TaskListFilter options={optionsData} changeOptions={changeOptions} />
            <TaskList tasks={data} viewOptions={optionsData} setTaskChecked={setTaskChecked} />
            <TaskAddForm />
        </div>
    )
}

export default App;

