import React, { useEffect, useState } from "react";
import './ProfileHeader.css';
import api from '../../../utils/api';

function ProfileHeader() {

    const [loadingHeaderTxt, setloadingHeaderTxt] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [banner, setBanner] = useState('');
    const [nbTemplates, setNbTemplates] = useState(0);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        const fetchProfileHeaderInfo = async () => {
            try {
                const response = await api.get('profile/');
                setUsername(response.data.username);
                setNbTemplates(response.data.template.length);

            } catch (error) {
                setError(error);
            } finally {
                setloadingHeaderTxt(false);
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

            } catch (error) {
                setError(error);
            }
        }
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

            } catch (error) {
                setError(error);
            }
        }
        fetchProfileHeaderInfo();
        fetchBanner();
        fetchProfileImage();
    }, []);


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
                            {loadingHeaderTxt ? <div className="profile-header-info-user loading">
                                <h1></h1>
                                <p></p>
                            </div>
                                : <div className="profile-header-info-user">
                                    <h1>{username}</h1>
                                    <p>{nbTemplates} templates</p>
                                </div>}
                            <div className="profile-header-actions">
                                <button className="profile-header-button">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default ProfileHeader;