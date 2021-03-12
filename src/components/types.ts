export type ListFilters = 'All' | 'Today' | 'Tomorrow' | 'Upcoming' | 'Anytime' | 'Important'  ;

export interface taskType {
    id : string;
    text : string;
    complete : boolean;
    category : string;
    important : boolean;
    expiredDate : string|number;
}

export interface TaskListTitleProps {
    currentFilter : ListFilters;
    currentDate : Date;
    addTask : (newTask : taskType) => void;
    searchQuery : string;
    makeQuery : (newValue : string) => void;
    nextId : string;
}

export interface TaskListContentProps {
    tasks : taskType[] | [];
    categories : string[] | [];
    currentFilter : ListFilters;
    showCompleted : boolean;
    searchQuery : string;
    currentDate : Date;
    setTaskChecked : (newValue : string) => void;
    editTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
}


export interface TaskListProps {
    tasks : taskType[] | [];
    currentFilter : ListFilters;
    editTask : (newTask : taskType) => void;
    addTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
    currentDate : Date;
    searchQuery : string;
    makeQuery : (newValue : string) => void;
    setTaskChecked : (newValue : string) => void;
    showCompleted : boolean;
} 

export interface TaskAddFormProps {
    nextId : string;
    addTask : (newTask : taskType) => void;
    toggleMode : () => void;
    currentDate : Date;
}

export interface FilterProps {
    currentFilter : ListFilters;
    changeFilter : (newFilter : ListFilters) => void;
    deleteCompleted : () => void;
    showCompleted : boolean;
    changeViewCompletedSetting : () => void; 
}

export interface EditTaskProps {
    task : taskType;
    currentDate : Date;
    addTask? : (newTask : taskType) => void;
    editTask? : (newTask : taskType) => void;
    toggleMode : () => void;
}

export interface TaskElementType {
    taskData : taskType;
    currentDate : Date;
    setTaskChecked : (newValue : string) => void;
    editTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
}
