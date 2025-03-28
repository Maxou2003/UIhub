import React, { useState } from 'react';
import './css/Template.css';
import TemplateVisualization from '../components/TemplateComponents/TemplateVisualization/TemplateVisualization';
import { useParams } from "react-router"
import api from '../api';
import { useEffect } from 'react';



function Template() {

    let { id } = useParams();
    const [template, setTemplate] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await api.get(`template/${id}`);
                setTemplate(response.data.template);
            } catch (error) {
                console.error('Error fetching template:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, []);


    return (
        <div className="template" style={{ paddingTop: '100px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="template-header">
                <h1 className="template-title">Template Title</h1>
                <p className="template-description">This my template id: {id}</p>
            </div>
            <div className="template-content">
                {!loading && <TemplateVisualization htmlString={template.html} cssString={template.css} />}
            </div>
        </div>
    );
}
export default Template;