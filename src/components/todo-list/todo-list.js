import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete, onEdit, onSave }) => {

    const elements = items && items.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onDelete={() => onDelete(id)}
                    onEdit={() => onEdit(id)}
                    onSave={(label) => onSave(id, label)}
                />
            </li>
        );
    });

    return (<ul className="todo-list list-group">{elements}</ul>);
};

export default TodoList;