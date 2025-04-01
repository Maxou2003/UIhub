import './EditableTemplateVisualization.css';
import React, { useState, useEffect } from 'react';

function EditableTemplateVisualization({ initialHtml, initialCss, onSave, onCancel }) {
    const [activeTab, setActiveTab] = useState('html');
    const [html, setHtml] = useState(initialHtml);
    const [css, setCss] = useState(initialCss);

    useEffect(() => {
        setHtml(initialHtml);
        setCss(initialCss);
    }, [initialHtml, initialCss]);

    const iframeContent = `
        <!DOCTYPE html>
        <html style="height:100%">
          <head>
            <style>
              * { padding: 0; margin: 0; box-sizing: border-box; }
              body { height:100%; width:100%;overflow-y: hidden; overflow-x: hidden; }
              .template-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
              }
              ${css}
            </style>
          </head>
          <body>
            <div class="template-container">
              ${html}
            </div>
          </body>
        </html>
    `;

    const handleTabChange = (type) => {
        setActiveTab(type);
    };

    const handleCodeChange = (e) => {
        const value = e.target.value;
        if (activeTab === 'html') {
            setHtml(value);
        } else {
            setCss(value);
        }
    };

    const handleSave = () => {
        onSave({ html, css });
    };

    const handleCancel = () => {
        setHtml(initialHtml);
        setCss(initialCss);
        onCancel();
    }

    return (
        <div className="template-visualization">
            <div className='template-preview'>
                <iframe
                    title="Preview Content"
                    srcDoc={iframeContent}
                    style={{ border: 'medium', width: '100%', height: '100%' }}
                ></iframe>
            </div>
            <div className='template-code'>
                <div className='template-code-decider'>
                    <button
                        className={`html-code-btn ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => handleTabChange('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`css-code-btn ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => handleTabChange('css')}
                    >
                        CSS
                    </button>
                </div>
                <div className='template-code-content'>
                    <textarea
                        value={activeTab === 'html' ? html : css}
                        onChange={handleCodeChange}
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '1rem',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            border: 'none',
                            resize: 'none',
                            outline: 'none',
                        }}
                        spellCheck="false"
                    />

                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                    {/* <SyntaxHighlightingEditor
                        language={activeTab}
                        value={activeTab === 'html' ? html : css}
                        onChange={(value) => {
                            if (activeTab === 'html') {
                                setHtml(value);
                            } else {
                                setCss(value);
                            }
                            setIsDirty(true);
                        }}
                    /> */}
                </div>
            </div>
        </div >
    );
}

export default EditableTemplateVisualization;