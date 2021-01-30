import { taskType } from './components/types';

export const pushToStorage = function(targetArray : taskType[] | []) {
    const data = JSON.stringify(targetArray);
    localStorage.setItem('TasksList', data);
};

export const getFromStorage = function() {
    const data = localStorage.getItem('TaskList');
    if (data === null) {
        pushToStorage([]);
        return [];
    }
    return JSON.parse(data);
};