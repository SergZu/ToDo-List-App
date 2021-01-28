export type mark = 'none' | 'blue' | 'green' | 'red' | 'black';

export interface options {
    showCompleted: boolean;
    splited : boolean;
    currentMark : mark;
}

export interface task {
    id : string;
    text : string;
    complete : boolean;
    mark : mark;
}

export interface Task {
    data : task;
    completeTaskClickHandler : React.ChangeEventHandler<HTMLInputElement>;
    setTaskChecked : (id : string) => void;
}

export interface TaskListProps {
    tasks : task[] | [];
    viewOptions : options;
    setTaskChecked : (id : string) => void;
} 