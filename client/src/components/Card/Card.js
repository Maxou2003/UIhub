import React from 'react';
import './Card.css';

function Card() {
    return (
        <div className="card">
            <iframe
                title="Preview Content"
                srcdoc={`
          <!DOCTYPE html>
          <html style="height:100%">
            <head>
              <style>
                * { padding: 0; margin: 0; box-sizing: border-box; }
                body { height:100%; width:100%; }
                .button {
                  position: relative;
                  width: 120px;
                  height: 40px;
                  background-color: #000;
                  display: flex;
                  align-items: center;
                  color: white;
                  flex-direction: column;
                  justify-content: center;
                  border: none;
                  padding: 12px;
                  gap: 12px;
                  border-radius: 8px;
                  cursor: pointer;
                }
                .button::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  left: -4px;
                  top: -1px;
                  margin: auto;
                  width: 128px;
                  height: 48px;
                  border-radius: 10px;
                  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
                  z-index: -10;
                  pointer-events: none;
                  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .button::after {
                  content: '';
                  z-index: -1;
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
                  transform: translate3d(0, 0, 0) scale(0.95);
                  filter: blur(20px);
                }
                .button:hover::after { filter: blur(30px); }
                .button:hover::before { transform: rotate(-180deg); }
                .button:active::before { scale: 0.7; }
                .item-container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  width: 100%;
                }
              </style>
            </head>
            <body>
              <div class="item-container">
                <button class="button">Button</button>
              </div>
            </body>
          </html>
        `}
                style={{ border: 'medium', width: '100%', height: '100%' }}
            ></iframe>
        </div>
    );
}

export default Card;