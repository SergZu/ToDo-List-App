export type mark = 'none' | 'blue' | 'green' | 'red' | 'black' ;

export interface options {
    showCompleted: boolean;
    splited : boolean;
    currentMark : mark | '';
}

export interface taskType {
    id : string;
    text : string;
    complete : boolean;
    mark : mark;
}

export interface TaskElementType {
    data : taskType;
    onChangeHandler : React.ChangeEventHandler;
    onEditTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
}

export interface TaskListProps {
    tasks : taskType[] | [];
    viewOptions : options;
    setTaskChecked : (id : string) => void;
    editTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
} 

export interface FilterProps {
    options : options;
    changeOptions : (newOption : options) => void;
    deleteCompleted : () => void;
}

export interface EditTaskProps {
    data : taskType;
    onSubmitTaskHandler : (newTask : taskType) => void;
    stopEdit? : () => void;
    deleteTask : (id : string) => void;
}

export interface TaskAddFormProps {
    currentId : string;
    addTask : (newTask : taskType) => void;
    deleteTask : (id : string) => void;
}