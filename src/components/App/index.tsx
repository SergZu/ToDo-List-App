import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList';
import TaskListFilter from '../TaskListFilter';
import { ListFilters, taskType } from '../types';
import './styles.scss';
import { pushToStorage, getFromStorage } from '../../storageUtils';
/* TODO : 1.Create two-lined layout for task and change btns to icons 2.fix bugs, add keyboard event listeners and fix tabIndex  3.do media queries 4.do manifest and service worker for PWA */
const App = function() {

    const [data , setData] = useState(  getFromStorage() );
    const [currentFilter, setFilter] = useState( () : ListFilters => 'All');
    const [currentDate, setDate] = useState( () => ( new Date() ) );
    const [searchQuery, setQuery] = useState('');
    const [showCompleted, setViewCompleted] = useState(false);

    let timerId : number;
    
    useEffect(() => {
        const updateDate = () => {
            setDate( new Date() );
        };
        timerId = window.setInterval(updateDate , 60000);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    const changeFilter = (newFilter : ListFilters) => {
        setFilter(newFilter);
    };

    const changeViewCompletedSetting = () => {
        setViewCompleted( (option) => !option );
    }

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

    const setTaskChecked = (id : string) => {
        const taskData = [...data];
        const targetElement = taskData.find( (item) => item.id === id );
        if (targetElement !== undefined) targetElement.complete = !targetElement.complete; 
        setData(taskData);
        pushToStorage(taskData);
    };

    const deleteAllCompleted = () => {
        const taskData = [...data].filter((item) => !item.complete);
        setData(taskData);
        pushToStorage(taskData);
    };

    const makeQuery = (newValue : string) => {
        setQuery(newValue);
    };

    return (
        <div className='TaskListApp'>
            <TaskListFilter currentFilter={currentFilter} changeFilter={changeFilter} deleteCompleted={deleteAllCompleted}
            showCompleted={showCompleted} changeViewCompletedSetting={changeViewCompletedSetting} />
            <TaskList tasks={data} currentFilter={currentFilter} editTask={editTask} addTask={addTask} deleteTask={deleteTask} 
            currentDate={currentDate} searchQuery={searchQuery} makeQuery={makeQuery} setTaskChecked={setTaskChecked} showCompleted={showCompleted} />
        </div>
    )
}

export default App;

