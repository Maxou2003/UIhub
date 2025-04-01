import React, { useEffect, useState } from 'react';
import './css/Profile.css';
import api from '../utils/api';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileCardCarrusel from '../components/ProfileComponents/ProfileCardCarrusel/ProfileCardCarrusel';


function Profile() {

    const [loggedUSer, setLoggedUser] = useState({});

    useEffect(() => {

        const fetchLoggedUser = async () => {
            try {
                const response = await api.get(`/auth/logged`);
                setLoggedUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchLoggedUser();
    }, []);

    return (
        <div className="profile">
            <ProfileHeader />
            <div className="profile-content">
                <h1 className="title">Favorite✨</h1>
                <ProfileCardCarrusel favorite={true} logged={loggedUSer} />
            </div>
            <div className="profile-content">
                <h1 className="title">All templates</h1>
                <ProfileCardCarrusel favorite={false} logged={loggedUSer} />
            </div>
        </div>
    );
}
export default Profile;