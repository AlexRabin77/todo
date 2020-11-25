
import React, { useState } from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchChange }) => {
    const [term, setTerm] = useState('');

    const onTermChange = (e) => {
        setTerm(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <input type="text"
            className="form-control search-input"
            placeholder="Type to search..."
            value={term}
            onChange={onTermChange} />
    );
}

export default SearchPanel;