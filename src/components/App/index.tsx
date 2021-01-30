import React, { useState } from 'react';
import TaskList from '../TaskList';
import TaskAddForm from '../TaskAddForm';
import TaskListFilter from '../TaskListFilter';
import { options, taskType } from '../types';
import './style.scss';
import { pushToStorage, getFromStorage } from '../../storageUtils';

const App = function() {

    const [data , setData] = useState( getFromStorage() );
    const [optionsData, setOptionsData] = useState( () : options =>({
        showCompleted: false,
        splited : false,
        currentMark : '',
    }) );

    const computeID = () => {
        if (data.length === 0) return '1';
        const sortedByIdTasks = [...data].sort((a,b) => Number(b.id) - Number(a.id));
        return `${Number(sortedByIdTasks[0].id) + 1}`
    };

    const currentId = computeID();

    const setTaskChecked = (id : string) => {
        const taskData = [...data];
        const targetElement = taskData.find( (item) => item.id === id );
        if (targetElement !== undefined) targetElement.complete = !targetElement.complete; 
        setData(taskData);
        pushToStorage(taskData);
    };

    const changeOptions = (newOptions : options) => {
        setOptionsData(newOptions);
    };

    const addTask = (newTask : taskType) => {
        const taskData = [...data, newTask];
        setData(taskData);
        pushToStorage(taskData);
    };

    const editTask = (newTask : taskType) => {
        const taskData = [...data];
        const targetElementIndex = taskData.findIndex( (item) => item.id === newTask.id );
        if (targetElementIndex !== -1) taskData[targetElementIndex] = newTask;
        setData(taskData);
        pushToStorage(taskData);
    };

    const deleteTask = (id : string) => {
        const taskData = [...data];
        const targetElementIndex = taskData.findIndex( (item) => item.id === id );
        if (targetElementIndex !== -1) taskData.splice(targetElementIndex, 1);
        setData(taskData);
        pushToStorage(taskData);
    }; 

    const purgeAllCompleted = () => {
        const taskData = [...data].filter((item) => !item.complete);
        setData(taskData);
        pushToStorage(taskData);
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

