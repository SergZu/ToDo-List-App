import React from 'react';
import './styles.scss';
import { FilterProps, ListFilters } from '../types';

const TaskListFilter = function(props : FilterProps) {

    const { currentFilter, changeFilter, deleteCompleted, showCompleted, changeViewCompletedSetting } = props;

    const showCompletedCheckClass = showCompleted ? 'TaskListFilter-completed  checked' : 'TaskListFilter-completed';
    const filtersClassName = 'TaskListFilter-item';
    const activeFilterClassName = 'TaskListFilter-item active';
    const onClickHandler : React.MouseEventHandler = (evt) => {
        changeFilter(evt.currentTarget.id as ListFilters);
    };
    const onKeyPressHandler : React.KeyboardEventHandler = (evt) => {
        if (evt.key === 'Enter') {
			changeFilter(evt.currentTarget.id as ListFilters);
		}
    };
    const onKeyPressCheckedHandler : React.KeyboardEventHandler = (evt) => {
        if (evt.key === 'Enter') changeViewCompletedSetting()
    };
    const onKeyPressDeleteBtnHandler : React.KeyboardEventHandler = (evt) => {
        if (evt.key === 'Enter') deleteCompleted()
    };

    return (
        <aside className='TaskListFilter'>
            <div className={currentFilter === 'All' ? activeFilterClassName : filtersClassName} id='All' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1} >My Tasks</div>
            <div className={currentFilter === 'Today' ? activeFilterClassName : filtersClassName} id='Today' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1}>Today</div>
            <div className={currentFilter === 'Tomorrow' ? activeFilterClassName : filtersClassName} id='Tomorrow' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1}>Tomorrow</div>
            <div className={currentFilter === 'Upcoming' ? activeFilterClassName : filtersClassName} id='Upcoming' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1}>Upcoming</div>
            <div className={currentFilter === 'Anytime' ? activeFilterClassName : filtersClassName} id='Anytime' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1}>Anytime</div>
            <div className={currentFilter === 'Important' ? activeFilterClassName : filtersClassName} id='Important' 
                onClick={onClickHandler} onKeyPress={onKeyPressHandler} tabIndex={1}>Important</div>
            <label className={showCompletedCheckClass} tabIndex={1} onKeyPress={onKeyPressCheckedHandler}>
                <input type="checkbox" checked={showCompleted} onChange={changeViewCompletedSetting} /><span>Completed</span>
            </label>
            <button className='TaskListFilter-btn__delete' onClick={deleteCompleted} onKeyPress={onKeyPressDeleteBtnHandler}>Delete all completed</button>
        </aside>
    )
}

export default TaskListFilter;
