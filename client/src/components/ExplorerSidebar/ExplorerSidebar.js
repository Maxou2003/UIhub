import React from 'react';
import './ExplorerSidebar.css';

function ExplorerSidebar({ filters, setFilters }) {
    const categories = ['Button', 'Checkbox', 'Card', 'Loader', 'Toggle Switch', 'Radio Button', 'Form', 'Input'];

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };


    return (
        <div className="explorer-sidebar">
            <div className="sidebar-section">
                <h3>Categories</h3>
                <div className="filter-options">
                    {categories.map(category => (
                        <label key={category} className="ios-checkbox purple">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            /><div class="checkbox-wrapper">
                                <div class="checkbox-bg"></div>
                                <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
                                    <path
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="3"
                                        stroke="currentColor"
                                        d="M4 12L10 18L20 6"
                                        class="check-path"
                                    ></path>
                                </svg>
                            </div>
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExplorerSidebar;