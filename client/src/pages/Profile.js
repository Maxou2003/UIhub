import React from 'react';
import './css/Profile.css';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileCardCarrusel from '../components/ProfileComponents/ProfileCardCarrusel/ProfileCardCarrusel';


function Profile() {
    return (
        <div className="profile">
            <ProfileHeader />
            <div className="profile-content">
                <h1 className="title">Favorite✨</h1>
                <ProfileCardCarrusel favorite={true} />
            </div>
            <div className="profile-content">
                <h1 className="title">All templates</h1>
                <ProfileCardCarrusel favorite={false} />
            </div>
        </div>
    );
}
export default Profile;