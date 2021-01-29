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
}

export interface TaskListProps {
    tasks : taskType[] | [];
    viewOptions : options;
    setTaskChecked : (id : string) => void;
} 