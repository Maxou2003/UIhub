import './TemplateHeader.css';
import React, { use, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import Modal from 'react-bootstrap/Modal'
import api from '../../../utils/api';
import { isConnected } from '../../../utils/connected';
import { useEffect } from 'react';

function TemplateHeader({ owner, label, id, favorite }) {

    const [user, setUser] = useState({});
    const [loggedUser, setLoggedUser] = useState({});
    const [profileImage, setProfileImage] = useState('');
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [loadingLoggedUserInfo, setLoadingLoggedUserInfo] = useState(true);
    const [loadingProfileImage, setLoadingProfileImage] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`auth/${owner}`);
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoadingUserInfo(false);
            }
        };
        const fetchProfileImage = async () => {
            try {
                const response = await api.get(`/profile/image/${owner}`, {
                    responseType: 'arraybuffer'
                });

                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''
                    )
                );
                setProfileImage(`data:image/png;base64,${base64}`);

            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoadingProfileImage(false);
            }
        }
        const fetchLoggedUser = async () => {
            try {
                const response = await api.get(`/auth/logged`);
                setLoggedUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoadingLoggedUserInfo(false)
            }
        };
        fetchLoggedUser();
        fetchUser();
        fetchProfileImage();
    }, []);

    const handleFork = () => {
        const forkRequest = api.put(`/template/fork/${id}`)
            .then(() => {
                setModalContent('Your template has been forked successfully !');
                setShow(true);
            })
            .catch(error => {
                console.log(error);
                setModalContent('We haven\'t been able to fork the template !');
                setShow(true);
            });
    }
    const handleClose = () => {
        setShow(false);
    }



    return (
        <div className="template-header" >
            <Modal
                show={show}
                onHide={handleClose}
                centered
                className={`custom-modal ${modalContent.includes('successfully') ? 'success' : 'error'}`}
                backdropClassName="modal-backdrop"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <svg viewBox="0 0 24 24">
                            {modalContent.includes('successfully') ? (
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            ) : (
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            )}
                        </svg>
                        {modalContent.includes('successfully') ? 'Success!' : 'Oops!'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="modal-btn modal-btn-primary"
                        onClick={handleClose}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
                        </svg>
                        Got it!
                    </button>
                    {modalContent.includes('successfully') && (
                        <button
                            className="modal-btn modal-btn-outline"
                            onClick={() => window.location.href = '/profile'}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" fill="currentColor" />
                            </svg>
                            View Templates
                        </button>
                    )}
                </Modal.Footer>
            </Modal>
            <button className="header-button" onClick={() => window.location.href = '/'}>
                <IonIcon icon={arrowBack} /> Go Back
            </button>
            <div className='template-right-side'>
                {!loadingUserInfo && !loadingProfileImage && < div className="header-credits">{label} by
                    <button className="header-profile-button" onClick={() => window.location.href = `/profile/${user._id}`}>
                        <div className="header-profile-image-container">
                            <img className="header-profile-image" src={profileImage} alt="Profile" />
                        </div>
                        {user.username}
                    </button>
                </div>}
                {isConnected() && !loadingLoggedUserInfo && loggedUser._id != owner && < button className='fork-btn' onClick={handleFork}><span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                        fill="currentColor"
                    ></path>
                </svg>
                    Fork</span></button>}
                {loggedUser._id == owner && !favorite && <button className='fork-btn'> <span>Add to favorite ✨</span></button>}

            </div>
        </div >
    );
}
export default TemplateHeader;