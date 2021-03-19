import React from 'react';
import Task from '../Task';
import { TaskListContentProps, taskType } from '../types';
import './styles.scss';

interface categoriesMap {
    [index : string] : taskType[] | [];
}


const TaskListContent = function(props : TaskListContentProps) {
    const { tasks, categories, currentFilter, editTask, deleteTask, setTaskChecked, showCompleted, searchQuery, currentDate} = props;

    const createTaskList = () => {

        const categoriesMap : categoriesMap = {'Unmarked' : []};
        categories.sort().forEach((item) => {
            if (item === '') return;
            categoriesMap[item] = [];
        })


        
        const filteredTasks = tasks.filter((item) => {

            const searchRegExp = new RegExp(`${searchQuery}`, 'gi');
            if (!searchRegExp.test(item.text)) return false
            
            if (item.complete && !showCompleted) return false;

            if (currentFilter === 'All') return item;
            if (currentFilter === 'Anytime' && !item.expiredDate) return (item.expiredDate === '');
            if (currentFilter === 'Anytime') return (Date.now() - Number(item.expiredDate) ) > 0;
            if (currentFilter === 'Important') return item.important;

            let targetDate : null | Date = null;
            if (item.expiredDate !== '') targetDate = new Date(item.expiredDate);
                else return false;
            const now = new Date();
            if (currentFilter === 'Today') return targetDate.getDate() === now.getDate();
            if (currentFilter === 'Tomorrow') return targetDate.getDate() === new Date(Number(now) + 86400000).getDate();
            if (currentFilter === 'Upcoming') return Number(now) < Number(targetDate);
        });

        filteredTasks.sort( (a,b) => {
            let numA = typeof(a.expiredDate) === 'string' ? 0 : a.expiredDate;
            let numB = typeof(b.expiredDate) === 'string' ? 0 : b.expiredDate;
            return numA - numB
        } );

        filteredTasks.forEach( (item) => {
            const catName = item.category === '' ? 'Unmarked' : item.category;
            categoriesMap[catName] = [...categoriesMap[catName], item]
        } );

        let result = [];

        for (let item in categoriesMap) {
            const tasks = categoriesMap[item];
            if (tasks.length === 0) continue;
            const listElement = (
            <li key={item} className='task-list-content-categories' >
                <h3 className='tl-categories-title'>{item}</h3>
                {tasks.map((item : taskType) => (
                <Task key={item.id} setTaskChecked={setTaskChecked} editTask={editTask} 
                deleteTask={deleteTask} taskData={item} currentDate={currentDate} />
                ))}
            </li>
            );
            result.push(listElement); 
        }

        return result.length === 0 ? (<span id='task-list__no-tasks'>There are no tasks here</span>) :
                                    (<>{result}</>)
    };

    
    return (
        <ul className='task-list-content'>
            { createTaskList() }
        </ul>
    )
}

export default TaskListContent
