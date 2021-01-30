import React, {useState} from 'react';
import { taskType, mark, EditTaskProps } from '../types';

const EditTask = function(props : EditTaskProps) {
    const { text, id, mark, complete } = props.data;
    
    const [ taskData, changeTaskData ] = useState( () : taskType => ({text, id, mark, complete}) );

    const onChangeTextHandler : React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        const newData = {...taskData};
        newData.text = evt.target.value;
        changeTaskData(newData);
    };

    const onChangeMarkHandler : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const newData = {...taskData};
        newData.mark = evt.target.value as mark;
        changeTaskData(newData);
    };

    const submitTask : React.FormEventHandler = (evt) => {
        props.onSubmitTaskHandler(taskData);
        if (props?.stopEdit) {
            props.stopEdit();
        }
        else {
            const id = `${Number(taskData.id) + 1}`;
            const { text, mark, complete } = props.data;
            changeTaskData({ text, id, mark, complete });
        }
    }
    return (
        <div className='task-editable'>
            <textarea value={taskData.text} onChange={onChangeTextHandler} />
            <div className='task-marks'>Current mark :
                <label className='TaskListFilter-mark:red'><input type='radio' value='red' checked={taskData.mark === 'red'} onChange={onChangeMarkHandler} />Red</label>
                <label className='TaskListFilter-mark:black'><input type='radio' value='black' checked={taskData.mark === 'black'} onChange={onChangeMarkHandler} />Black</label>
                <label className='TaskListFilter-mark:blue'><input type='radio' value='blue' checked={taskData.mark === 'blue'} onChange={onChangeMarkHandler} />Blue</label>
                <label className='TaskListFilter-mark:green'><input type='radio' value='green' checked={taskData.mark === 'green'} onChange={onChangeMarkHandler} />Green</label>
                <label className='TaskListFilter-mark:none'><input type='radio' value='none' checked={taskData.mark === 'none'} onChange={onChangeMarkHandler} />Unmarked</label>
            </div>
            <input type='button' className='task-btn__apply' onClick={submitTask} value='Complete' />
        </div>
    )
}


export default EditTask
