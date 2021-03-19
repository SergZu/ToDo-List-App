import React, {useState} from 'react';
import { EditTaskProps } from '../types';
import {convertDate} from '../../dateUtils';
import './styles.scss';

const EditTask = function(props : EditTaskProps) {
    const { task, toggleMode, currentDate } = props;
    const [ taskData, changeTaskData ] = useState( () => ({...task}) );
    const [ scheduled, scheduleTask ] = useState( () => !(taskData.expiredDate === '') );
    const [ taskTextError, setTaskError] = useState(false);

     const onChangeTextHandler : React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        setTaskError(false); 
        const newData = {...taskData};
        const taskText  = evt.currentTarget.value.length < 150 ? evt.currentTarget.value : `${evt.currentTarget.value.slice(0, 150)}...`;
        newData.text = taskText;
        changeTaskData(newData);
    };

    const onImportantClickHandler : React.MouseEventHandler = () => {
        const newData = {...taskData};
        newData.important = !taskData.important; 
        changeTaskData(newData);
    };

    const onDateChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const target = new Date(evt.currentTarget.value);
        if (Number(currentDate) - Number(target) >= 0) return;
        const newData = {...taskData};
        newData.expiredDate = Number(target);
        changeTaskData(newData);  
    };

    const onChangeCategoryHandler : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const newData = {...taskData};
        const taskCategory = evt.currentTarget.value.length < 40 ? evt.currentTarget.value : `${evt.currentTarget.value.slice(0, 40)}...`
        newData.category = taskCategory; 
        changeTaskData(newData);
    };

    const submitTask = () => {
        if (taskData.text.trim().length === 0) {
            setTaskError(true);
            return
        }
        if (!!props.addTask) {
            props.addTask(taskData);
        }
        if (!!props.editTask) {
            props.editTask(taskData);
        }
        toggleMode();
    };

    const cancelTask = () => {
        toggleMode();
    };

    const onScheduleTask = () => {
        scheduleTask((item) => !item);
    };

    const dataInputValue = taskData.expiredDate !== '' ? convertDate(taskData.expiredDate as number) : '';
    console.log(`Expired Date : ${taskData.expiredDate}`)
    const categoryInputValue = taskData.category !== '' ? taskData.category : '';
    const importantBtnClass = taskData.important ? 'taskEdit-btn__important highlight' : 'taskEdit-btn__important';
    const taskTextareaClass = taskTextError ? 'taskEdit-text invalid' : 'taskEdit-text';
    const expiredDateLayout = scheduled ? 
        (<label className='taskEdit-expired'>Expired date : 
            <input type='datetime-local' value={dataInputValue} onChange={onDateChangeHandler} min={convertDate(Number(currentDate))} />
         </label>) 
         : (<input type='button' className='taskEdit-btn__schedule' onClick={onScheduleTask} value='Schedule' />);

    return (
        <form className='task-editable'>
            <h3 className='taskEdit-mode'>{(!!props.addTask) ? 'Add task' : 'Edit task'}</h3>
            <textarea className={taskTextareaClass} value={taskData.text} onChange={onChangeTextHandler} 
            placeholder={taskTextError ? 'Please Enter Task Name' : 'Task text'} />
            <input type='button' className={importantBtnClass} onClick={onImportantClickHandler} value='Important' />
            {expiredDateLayout}
            <input type='text' className='taskEdit-category' onChange={onChangeCategoryHandler} placeholder='Task category' 
                value={categoryInputValue} />
            <input type='button' className='taskEdit-btn__cancel' onClick={cancelTask} />
            <input type='button' className='taskEdit-btn__apply' onClick={submitTask} />
        </form>
    )
}


export default EditTask
