import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

const initState = {
    items: [
        { id: 1, label: 'Go to the bank', important: false, done: true, edit: false },
        { id: 2, label: 'Perform an exercise', important: true, done: false, edit: false },
        { id: 3, label: 'Drink cofee', important: false, done: false, edit: false }
    ],
    filter: 'all',
    search: ''
};
const MAX_ID = initState.items.length + 1;

const App = () => {
    const [nextId, setNextId] = useState(MAX_ID);
    const [items, setItems] = useState(initState.items);
    const [filter, setFilter] = useState(initState.filter);
    const [search, setSearch] = useState(initState.search);
    const [visibleItems, setVisibleItems] = useState(null);
    const [doneCount, setDoneCount] = useState(null);
    const [toDoCount, setToDoCount] = useState(null);

    useEffect(() => {
        const count = items.filter((item) => item.done).length;
        setVisibleItems(searchItems(filterItems(items, filter), search));
        setDoneCount(count);
        setToDoCount(items.length - count);
    }, [items, search, filter]);

    const searchItems = (items, search) => {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    const filterItems = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    const toggleProperty = (arr, id, propName) => {
        const index = arr.findIndex((item) => item.id === id);
        const oldItem = arr[index];
        const value = !oldItem[propName];

        const item = { ...arr[index], [propName]: value };
        return [
            ...arr.slice(0, index),
            item,
            ...arr.slice(index + 1)
        ];
    };

    const onItemAdded = (label) => {
        const item = createItem(label);
        const newItems = [...items, item];
        setNextId(nextId + 1);
        setItems(newItems);
    };

    const onToggleDone = (id) => {
        const newiItems = toggleProperty(items, id, 'done');
        setItems(newiItems);
    };

    const onToggleImportant = (id) => {
        const newiItems = toggleProperty(items, id, 'important');
        setItems(newiItems);
    };

    const onDelete = (id) => {
        const index = items.findIndex((item) => item.id === id);
        const newitems = [
            ...items.slice(0, index),
            ...items.slice(index + 1)
        ];
        setItems(newitems);
    };

    const onEdit = (id) => {
        const newiItems = toggleProperty(items, id, 'edit');
        setItems(newiItems);
    };

    const onSave = (id, value) => {
        const index = items.findIndex((item) => item.id === id);
        const item = { ...items[index], label: value };
        const updated = [
            ...items.slice(0, index),
            item,
            ...items.slice(index + 1)
        ];
        const newiItems = toggleProperty(updated, id, 'edit');
        setItems(newiItems);
    };

    const onFilterChange = (filter) => {
        setFilter(filter);
    };

    const onSearchChange = (search) => {
        setSearch(search);
    };

    const createItem = (label) => {
        return {
            id: nextId,
            label,
            important: false,
            done: false,
            edit: false,
        };
    }

    return (
        <div className="todo-app">
            <AppHeader toDo={toDoCount} done={doneCount} />

            <div className="search-panel d-flex">
                <SearchPanel
                    onSearchChange={onSearchChange} />

                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={onFilterChange} />
            </div>

            <TodoList
                items={visibleItems}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone}
                onDelete={onDelete}
                onEdit={onEdit}
                onSave={onSave} />

            <ItemAddForm
                onItemAdded={onItemAdded} />
        </div>
    );
}

export default App;