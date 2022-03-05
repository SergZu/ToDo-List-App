import React from 'react';
import './styles.scss';
import { FilterProps, ListFilters } from '../types';

const TaskListFilter = function({ 
					currentFilter, 
					changeFilter, 
					deleteCompleted, 
					showCompleted, 
					changeViewCompletedSetting 
				} : FilterProps) {

    const showCompletedCheckClass = showCompleted ? 
							  'TaskListFilter-checkbox  checked' : 
							  'TaskListFilter-checkbox';
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
        <aside 
		className='TaskListFilter' 
		role="navigation" 
		aria-label="Primary"
	>
            <div 
				className={currentFilter === 'All' ? activeFilterClassName : filtersClassName} 
				id='All' 
						onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1} 
			>
		    	My Tasks
	    	</div>
            <div 
		    	className={currentFilter === 'Today' ? activeFilterClassName : filtersClassName} 
				id='Today' 
				onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1}
				>
		    	Today
	    	</div>
            <div 
				className={currentFilter === 'Tomorrow' ? activeFilterClassName : filtersClassName} 
				id='Tomorrow' 
				onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1}
			>
				Tomorrow
			</div>
            <div 
				className={currentFilter === 'Upcoming' ? activeFilterClassName : filtersClassName} 
				id='Upcoming' 
                onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1}
			>
				Upcoming
			</div>
            <div 
				className={currentFilter === 'Anytime' ? activeFilterClassName : filtersClassName} 
				id='Anytime' 
                onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1}
			>
				Anytime
			</div>
            <div 
				className={currentFilter === 'Important' ? activeFilterClassName : filtersClassName} 
				id='Important' 
                onClick={onClickHandler} 
				onKeyPress={onKeyPressHandler} 
				tabIndex={1}
			>
				Important
			</div>
            <div className='TaskListFilter-completed'>
                <span 
						role="checkbox" 
						aria-checked={showCompleted} 
						aria-labelledby="TaskListFilter-checkbox__text" 
						className={showCompletedCheckClass}  
						onClick={changeViewCompletedSetting} 
						onKeyPress={onKeyPressCheckedHandler} 
						tabIndex={1} 
				/>
                <label 
						id='TaskListFilter-checkbox__text' 
						onClick={changeViewCompletedSetting} 
				>
					Completed
				</label>
            </div>
            <button 
					className='TaskListFilter-btn__delete' 
					onClick={deleteCompleted} 
					onKeyPress={onKeyPressDeleteBtnHandler}
			>
				Delete all completed
			</button>
        </aside>
    )
}

export default TaskListFilter;
