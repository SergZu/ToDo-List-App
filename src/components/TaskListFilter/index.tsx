import React from 'react';
import './style.scss';
import { options, mark } from '../types';

interface FilterProps {
    options : options;
    changeOptions : (newOption : options) => void;
}

const TaskListFilter = function(props : FilterProps) {

    const { options, changeOptions } = props;

    const changeCompletedFilter = () => {
        let newOptions = {...options};
        newOptions.showCompleted = !options.showCompleted;
        changeOptions(newOptions);
    };

    const changeSplitFilter = () => {
        let newOptions = {...options};
        newOptions.splited = !options.splited;
        changeOptions(newOptions);
    };

    const changeMarkFilter : React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        let newOptions = {...options};
        newOptions.currentMark = evt.currentTarget.value as mark;
        changeOptions(newOptions);
    };

    return (
        <form className='TaskListFilter'>
            <label className='TaskListFilter-completed'>Show completed tasks <input name='ShowCompletedCheck' type='checkbox' checked={options.showCompleted} 
            onChange={changeCompletedFilter} /></label>
            <label className='TaskListFilter-splited'>Split by marks <input name='ShowSplitedCheck' type='checkbox' checked={options.splited} 
            onChange={changeSplitFilter} /></label>
            <div className='TaskListFilter-marks'>Current mark :
                <label className='TaskListFilter-mark:all'><input type='radio' value='' checked={options.currentMark === ''} onChange={changeMarkFilter} />All</label>
                <label className='TaskListFilter-mark:red'><input type='radio' value='red' checked={options.currentMark === 'red'} onChange={changeMarkFilter} />Red</label>
                <label className='TaskListFilter-mark:black'><input type='radio' value='black' checked={options.currentMark === 'black'} onChange={changeMarkFilter} />Black</label>
                <label className='TaskListFilter-mark:blue'><input type='radio' value='blue' checked={options.currentMark === 'blue'} onChange={changeMarkFilter} />Blue</label>
                <label className='TaskListFilter-mark:green'><input type='radio' value='green' checked={options.currentMark === 'green'} onChange={changeMarkFilter} />Green</label>
                <label className='TaskListFilter-mark:none'><input type='radio' value='none' checked={options.currentMark === 'none'} onChange={changeMarkFilter} />Unmarked</label>
            </div>
        </form>
    )
}

export default TaskListFilter;
