import React, { useState } from 'react';
import TemplateVisualization from '../components/TemplateComponents/TemplateVisualization/TemplateVisualization';
import TemplateHeader from '../components/TemplateComponents/TemplateHeader/TemplateHeader';
import { useParams } from "react-router"
import api from '../utils/api';
import { useEffect } from 'react';



function Template() {

    let { id } = useParams();
    const [template, setTemplate] = useState({});
    const [label, setLabel] = useState({});
    const [user, setUser] = useState({});
    const [favorite, setFavorite] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await api.get(`template/${id}`);
                setTemplate(response.data.template);
                setLabel(response.data.template.label);
                setUser(response.data.template.owner);
                setFavorite(response.data.template.favorite);
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
            {!loading && <TemplateHeader owner={user} label={label} id={id} favorite={favorite} />}
            {!loading && <TemplateVisualization htmlString={template.html} cssString={template.css} />}
        </div>
    );
}
export default Template;