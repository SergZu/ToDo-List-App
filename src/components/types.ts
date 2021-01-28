type mark = 'none' | 'blue' | 'green' | 'red' | 'black';

export interface options {
    showCompleted: boolean;
    splited : boolean;
    currentMark : mark;
}

export interface task {
    id : number;
    text : string;
    complete : boolean;
    mark : mark;
}
