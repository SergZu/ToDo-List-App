import React from 'react';
import TaskList from '../TaskList';
import TaskAddForm from '../TaskAddForm';

const App = function() {
    return (
        <>
            <h1>ToDo List</h1>
            <TaskList />
            <TaskAddForm />
        </>
    )
}

export default App;

