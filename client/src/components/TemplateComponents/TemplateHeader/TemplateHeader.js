import './TemplateHeader.css';
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import api from '../../../api';
import { useEffect } from 'react';

function TemplateHeader({ owner, label }) {

    const [user, setUser] = useState({});
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [profileImage, setProfileImage] = useState('');
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
                console.error('Error fetching user:', error);
            } finally {
                setLoadingProfileImage(false);
            }
        }
        fetchUser();
        // Waiting for a route to get the profile image from the userID
        fetchProfileImage();
    }, []);


    return (
        <div className="template-header" >
            <button className="header-button" onClick={() => window.location.href = '/'}>
                <IonIcon icon={arrowBack} /> Go Back
            </button>
            {!loadingUserInfo && !loadingProfileImage && <div className="header-credits">{label} by
                <button className="header-profile-button" onClick={() => window.location.href = `/profile/${user._id}`}>
                    <div className="header-profile-image-container">
                        <img className="header-profile-image" src={profileImage} alt="Profile" />
                    </div>
                    {user.username}
                </button>
            </div>}

        </div>
    );
}
export default TemplateHeader;