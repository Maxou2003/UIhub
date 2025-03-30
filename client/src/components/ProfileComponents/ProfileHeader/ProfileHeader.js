import React, { useEffect, useState, useRef } from "react";
import './ProfileHeader.css';
import api from '../../../utils/api';
import { Modal, Button } from 'react-bootstrap';

function ProfileHeader() {

    const [loadingHeaderTxt, setLoadingHeaderTxt] = useState(true);
    const [error, setError] = useState(null);

    const [username, setUsername] = useState('');
    const [banner, setBanner] = useState('');
    const [nbTemplates, setNbTemplates] = useState(0);
    const [profileImage, setProfileImage] = useState('');


    const [showEditModal, setShowEditModal] = useState(false);
    const [editUsername, setEditUsername] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [newBannerImage, setNewBannerImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const profileInputRef = useRef();
    const bannerInputRef = useRef();

    useEffect(() => {
        const fetchProfileHeaderInfo = async () => {
            try {
                const response = await api.get('profile/');
                setUsername(response.data.username);
                setEditUsername(response.data.username);
                setNbTemplates(response.data.template.length);
            } catch (error) {
                setError(error);
            } finally {
                setLoadingHeaderTxt(false);
            }
        };

        const fetchBanner = async () => {
            try {
                const response = await api.get('profile/banner', {
                    responseType: 'arraybuffer'
                });
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''
                    )
                );
                setBanner(`data:image/png;base64,${base64}`);
                setBannerPreview(`data:image/png;base64,${base64}`);
            } catch (error) {
                setError(error);
            }
        };

        const fetchProfileImage = async () => {
            try {
                const response = await api.get('profile/image', {
                    responseType: 'arraybuffer'
                });
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''
                    )
                );
                setProfileImage(`data:image/png;base64,${base64}`);
                setProfilePreview(`data:image/png;base64,${base64}`);
            } catch (error) {
                setError(error);
            }
        };

        fetchProfileHeaderInfo();
        fetchBanner();
        fetchProfileImage();
    }, []);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBannerImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            if (editUsername !== username) {
                formData.append('username', editUsername);
            }
            if (newProfileImage) {
                formData.append('profileImage', newProfileImage);
            }
            if (newBannerImage) {
                formData.append('bannerImage', newBannerImage);
            }

            await api.put('profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUsername(editUsername);
            if (newProfileImage) {
                setProfileImage(profilePreview);
            }
            if (newBannerImage) {
                setBanner(bannerPreview);
            }

            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setEditUsername(username);
        setNewBannerImage(banner);
        setNewProfileImage(profileImage);
        setBannerPreview(banner);
        setProfilePreview(profileImage);
        setShowEditModal(false);
    };

    return (
        <div className="profile-header">
            <div className="profile-header-container">
                <div className="profile-header-items">
                    <div className="profile-header-banner">
                        {banner && <img src={banner} alt="profile banner" />}
                    </div>
                    <div className="profile-header-info-container">
                        <div className="profile-header-avatar">
                            {profileImage && <img src={profileImage} alt="profile image" />}
                        </div>
                        <div className="profile-header-info">
                            {loadingHeaderTxt ? (
                                <div className="profile-header-info-user loading">
                                    <h1></h1>
                                    <p></p>
                                </div>
                            ) : (
                                <div className="profile-header-info-user">
                                    <h1>{username}</h1>
                                    <p>{nbTemplates} templates</p>
                                </div>
                            )}
                            <div className="profile-header-actions">
                                <button
                                    className="profile-header-button"
                                    onClick={() => setShowEditModal(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showEditModal}
                onHide={handleClose}
                className="profile-edit-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                        />
                    </div>

                    <div className="image-upload-container">
                        <div className="form-group">
                            <label>Profile Picture</label>
                            <div className="image-preview avatar-preview" onClick={() => profileInputRef.current.click()}>
                                <input
                                    type="file"
                                    ref={profileInputRef}
                                    onChange={handleProfileImageChange}
                                    accept="image/*"
                                    hidden
                                />
                                {profilePreview && <img src={profilePreview} alt="Profile preview" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Banner Image</label>
                            <div className="image-preview banner-preview" onClick={() => bannerInputRef.current.click()}>
                                <input
                                    type="file"
                                    ref={bannerInputRef}
                                    onChange={handleBannerImageChange}
                                    accept="image/*"
                                    hidden
                                />
                                {bannerPreview && <img src={bannerPreview} alt="Banner preview" />}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="modal-btn modal-btn-outline"
                        onClick={() => setShowEditModal(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        className="modal-btn modal-btn-primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfileHeader;