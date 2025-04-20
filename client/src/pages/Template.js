import React, { useState } from 'react';
import TemplateVisualization from '../components/TemplateComponents/TemplateVisualization/TemplateVisualization';
import EditableTemplateVisualization from '../components/TemplateComponents/EditableTemplateVisualization/EditableTemplateVisualization';
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
    const [edit, setEdit] = useState(false);

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

    const handleSave = async (updatedTemplate) => {
        try {
            const newtemplate = {
                ...template,
                html: updatedTemplate.html,
                css: updatedTemplate.css
            }
            await api.put(`/template`, {
                ...newtemplate
            });
        } catch (error) {
            console.error(error);
        } finally {
            setTemplate(updatedTemplate);
            setEdit(false);
        }

    };
    const handleEdit = () => {
        setEdit(true);
    };

    const handleCancel = () => {
        setEdit(false);
    }
    const formatCode = (code) => {
        return code
            .replace(/;/g, ';\n')
            .replace(/{/g, '{\n')
            .replace(/}/g, '\n}\n')
            .replace(/-->/g, '-->\n')
            .replace(/>/g, '>\n')
            .replace(/<\//g, '\n</')
            .replace(/\n+/g, '\n')
            .replace(/\,   /g, ',\n')
            .replace(/\*\//g, '\*\/\n');
    };


    return (
        <div className="template" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            {!loading && <TemplateHeader template={template} onEdit={handleEdit} edit={edit} />}
            {!loading && !edit && <TemplateVisualization htmlString={formatCode(template.html)} cssString={formatCode(template.css)} />}
            {!loading && edit && <EditableTemplateVisualization initialHtml={formatCode(template.html)} initialCss={formatCode(template.css)} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
}
export default Template;