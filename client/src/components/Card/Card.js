import React, { useState } from 'react';
import './Card.css';
import { IonIcon } from '@ionic/react';
import { trashOutline, closeOutline, checkmarkOutline } from 'ionicons/icons';
import api from '../../utils/api';
import { isConnected } from '../../utils/connected';

function Card({ htmlString, cssString, id, logged, owner, profile }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayDeleteButton, setDisplayDeleteButton] = useState(isConnected() && logged && (logged._id === owner) && profile);

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

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };
  const confirmDelete = async () => {
    try {
      await api.delete('/template/', {
        data: { _id: id }
      });
      setShowConfirmation(false);
      window.location.reload();
    } catch (error) {
      console.error('Delete action failed:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='card'>
      <iframe
        title="Preview Content"
        srcDoc={iframeContent}
        style={{ border: 'medium', width: '100%', height: '100%', display: 'block' }}
      ></iframe>

      {displayDeleteButton && (
        <>
          <button className='delete-btn' onClick={handleDelete}>
            <IonIcon className='red-trash-bin' icon={trashOutline} />
          </button>

          {showConfirmation && (
            <div className="delete-confirmation">
              <div className="delete-confirmation-content">
                <h3>Delete Template</h3>
                <p>Are you sure you want to delete this template? This action cannot be undone.</p>
                <div className="delete-confirmation-buttons">
                  <button className="delete-cancel-btn" onClick={cancelDelete}>
                    <IonIcon icon={closeOutline} /> Cancel
                  </button>
                  <button className="delete-confirm-btn" onClick={confirmDelete}>
                    <IonIcon icon={checkmarkOutline} /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <button className="cssbuttons-io" onClick={() => window.location.href = `/template/${id}`}>
        <span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
              fill="currentColor"
            ></path>
          </svg>
          Code
        </span>
      </button>
    </div>
  );
}

export default Card;