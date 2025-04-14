import React, { useState, useEffect } from 'react';
import ExplorerSidebar from '../components/ExplorerSidebar/ExplorerSidebar';
import Card from '../components/Card/Card';
import api from '../utils/api';
import './css/Explorer.css';

function Explorer() {
    const [filters, setFilters] = useState({
        categories: [],
    });
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const response = await api.post('/template/label', {
                    ...filters.categories
                });
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [filters]);

    return (
        <div className="explorer-page">
            <div className="explorer-content">
                <ExplorerSidebar filters={filters} setFilters={setFilters} />

                <div className="templates-grid">
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        templates.map(template => (
                            <Card
                                key={template._id}
                                htmlString={template.html}
                                cssString={template.css}
                                id={template._id}
                                owner={template.owner}
                                views={template.views}
                                saves={template.saves}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Explorer;