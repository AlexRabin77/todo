import React, { useState } from 'react';

import './todo-list-item.css';

const TodoListItem = ({ important, done, edit,
    label, onToggleImportant, onToggleDone, onDelete, onEdit, onSave }) => {
    const [tempLabel, setTempLabel] = useState(label);

    let classNames = 'todo-list-item';
    if (important) {
        classNames += ' important';
    }

    if (done) {
        classNames += ' done';
    }

    const onLabelChange = (e) => {
        setTempLabel(e.target.value);
    };

    const handleSave = () => {
        onSave(tempLabel);
    };

    return (
        <span className={classNames}>
            { edit ?
                <>
                    <input onChange={onLabelChange} value={tempLabel} />
                    <button type="button"
                        className="btn btn-outline-primary btn-sm float-right"
                        onClick={handleSave}>
                        <i className="fa fa-save"></i>
                    </button>
                </>
                :
                <>
                    <span
                        className="todo-list-item-label"
                        onClick={onToggleDone}>{label}</span>
                    <button type="button"
                        className="btn btn-outline-primary btn-sm float-right"
                        onClick={onEdit}>
                        <i className="fa fa-edit"></i>
                    </button>
                </>
            }
            <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
                <i className="fa fa-exclamation"></i>
            </button>

            <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDelete}>
                <i className="fa fa-trash-o"></i>
            </button>
        </span>
    );
};

export default TodoListItem;