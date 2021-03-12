import { taskType } from './components/types';

export const pushToStorage = function(targetArray : taskType[] ) {
    const data = JSON.stringify(targetArray);
    localStorage.setItem('TasksList', data);
};

export const getFromStorage = function() : taskType[] | []  {
    let data = localStorage.getItem('TasksList');
    if (data === null) {
        pushToStorage([]);
        return []
    };
    return JSON.parse(data)
};