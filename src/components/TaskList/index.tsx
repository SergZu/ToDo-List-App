import React from 'react';
import TaskListTitle from '../TaskListTitle';
import TaskListContent from '../TaskListContent';
import { TaskListProps } from '../types';
import './styles.scss';



const TaskList = function({ 
                            tasks, 
                            currentFilter, 
                            editTask, 
                            addTask, 
                            deleteTask, 
                            currentDate, 
                            searchQuery, 
                            makeQuery, 
                            setTaskChecked, 
                            showCompleted 
                        } : TaskListProps) {
    
    const computeID = () => {
        if (tasks.length === 0) return '1';
        const sortedByIdTasks = [...tasks].sort((a,b) => Number(b.id) - Number(a.id));
        return `${Number(sortedByIdTasks[0].id) + 1}`
    };
    
    const createCategoryList = () : string[] | [] => {
        if (tasks.length === 0) return [];
        let result : Set<string> = new Set();
        const tempTaskArray = [...tasks];
        tempTaskArray.forEach( 
                                (item) => {
                                            result.add(item.category)
                                });
        return [...result]
    }
    
    const nextId = computeID();
    const categories = createCategoryList();
    const categoriesListForAutocomplete = categories.length > 0 ? 
                                                                    (<datalist id="categories" hidden={true}>
                                                                        {
                                                                            categories.map(
                                                                                        (item : string)=>(<option value={item} key={item} />)
                                                                         )}
                                                                    </datalist>) : 
                                                                    null;
    return (
        <main className='TaskList'>
            <TaskListTitle 
                            currentFilter={currentFilter} 
                            currentDate={currentDate} 
                            searchQuery={searchQuery} 
                            makeQuery={makeQuery} 
                            addTask={addTask} 
                            nextId={nextId} 
             />
            <TaskListContent 
                                tasks={tasks} 
                                categories={categories} 
                                currentFilter={currentFilter} 
                                showCompleted={showCompleted}
                                editTask={editTask} 
                                deleteTask={deleteTask} 
                                setTaskChecked={setTaskChecked} 
                                searchQuery={searchQuery}  
                                currentDate={currentDate} 
            />
            {categoriesListForAutocomplete}
        </main>
    )
};

export default TaskList;

