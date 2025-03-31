import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './TemplateVisualization.css';
import React, { useState } from 'react';


function TemplateVisualization({ htmlString, cssString }) {

    const [activeTab, setActiveTab] = useState('html');
    const [codeContent, setCodeContent] = useState(htmlString);

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
          ${cssString}
        </style>
      </head>
      <body>
        <div class="template-container">
          ${htmlString}
        </div>
      </body>
    </html>
  `;
    const handleCodeChange = (type) => {
        const htmlBtn = document.querySelector('.html-code-btn');
        const cssBtn = document.querySelector('.css-code-btn');
        if (type === 'html') {
            htmlBtn.classList.add('active');
            if (cssBtn.classList.contains('active')) cssBtn.classList.remove('active');
        } else {
            cssBtn.classList.add('active');
            if (htmlBtn.classList.contains('active')) htmlBtn.classList.remove('active');
        }
        setActiveTab(type);
        setCodeContent(type === 'html' ? htmlString : cssString);
    };

    const formatCode = (code) => {
        return code
            .replace(/;/g, ';\n')
            .replace(/{/g, '{\n')
            .replace(/}/g, '\n}\n')
            .replace(/-->/g, '-->\n')
            .replace(/>/g, '>\n')
            .replace(/<\//g, '\n</')
            .replace(/\n+/g, '\n');
    };


    return (
        <div className="template-visualization" >
            <div className='template-preview'>
                <iframe
                    title="Preview Content"
                    srcDoc={iframeContent}
                    style={{ border: 'medium', width: '100%', height: '100%' }}
                ></iframe>
            </div>
            <div className='template-code'>
                <div className='template-code-decider'>
                    <button className="html-code-btn active" onClick={() => handleCodeChange('html')}>HTML</button>
                    <button className="css-code-btn" onClick={() => handleCodeChange('css')}>CSS</button>
                </div>
                <div className='template-code-content'>
                    <SyntaxHighlighter
                        language={activeTab}
                        style={tomorrow}
                        // wrapLines={true}
                        // wrapLongLines={true}
                        customStyle={{
                            margin: 0,
                            padding: '1rem',
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}
                        showLineNumbers={true}
                        lineNumberStyle={{
                            minWidth: '2.25em',
                            paddingRight: '1em',
                            userSelect: 'none'
                        }}
                        lineProps={{
                            style: {
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }
                        }}
                    >
                        {formatCode(codeContent)}
                    </SyntaxHighlighter>
                </div>
            </div>

        </div>
    );
}
export default TemplateVisualization;