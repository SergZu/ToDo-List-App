import React, { useState } from 'react';
import TaskList from '../TaskList';
import TaskAddForm from '../TaskAddForm';
import TaskListFilter from '../TaskListFilter';
import { options, taskType } from '../types';
import './style.scss';

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

    const computeID = () => {
        const sortedByIdTasks = [...data].sort((a,b) => Number(b.id) - Number(a.id));
        return `${Number(sortedByIdTasks[0].id) + 1}`
    };

    const currentId = computeID();

    const setTaskChecked = (id : string) => {
        const taskData = [...data];
        const targetElement = taskData.find( (item) => item.id === id );
        if (targetElement !== undefined) targetElement.complete = !targetElement.complete; 
        setData(taskData);
    };

    const changeOptions = (newOptions : options) => {
        setOptionsData(newOptions);
    };

    const addTask = (newTask : taskType) => {
        const newTaskData = [...data, newTask];
        setData(newTaskData);
    };

    const editTask = (newTask : taskType) => {
        const taskData = [...data];
        const targetElementIndex = taskData.findIndex( (item) => item.id === newTask.id );
        if (targetElementIndex !== -1) taskData[targetElementIndex] = newTask;
        setData(taskData);
    };

    const deleteTask = (id : string) => {
        const taskData = [...data];
        const targetElementIndex = taskData.findIndex( (item) => item.id === id );
        if (targetElementIndex !== -1) taskData.splice(targetElementIndex, 1);
        setData(taskData);
    }; 

    const purgeAllCompleted = () => {
        const newData = [...data].filter((item) => !item.complete);
        setData(newData);
    };

    return (
        <div className='TaskListApp'>
            <h1>ToDo List</h1>
            <TaskListFilter options={optionsData} changeOptions={changeOptions} deleteCompleted={purgeAllCompleted} />
            <TaskList tasks={data} viewOptions={optionsData} setTaskChecked={setTaskChecked} editTask={editTask} deleteTask={deleteTask} />
            <TaskAddForm currentId={currentId} addTask={addTask} deleteTask={deleteTask} />
        </div>
    )
}

export default App;

