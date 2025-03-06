import React from 'react';
import './Card.css';

function Card({ htmlString, cssString }) {
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

  return (
    <div className="card">
      <iframe
        title="Preview Content"
        srcDoc={iframeContent}
        style={{ border: 'medium', width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
}

export default Card;