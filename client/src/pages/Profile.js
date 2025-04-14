import React, { useEffect, useState } from 'react';
import './css/Profile.css';
import api from '../utils/api';
import { isConnected } from '../utils/connected';
import { useParams } from "react-router"
import ProfileHeader from '../components/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileCardCarrusel from '../components/ProfileComponents/ProfileCardCarrusel/ProfileCardCarrusel';

function Profile() {
    const { id } = useParams();
    const [loggedUser, setLoggedUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile data regardless of connection status
                if (isConnected()) {
                    const response = await api.get('/auth/logged');
                    setLoggedUser(response.data.user);
                    setIsOwner(response.data.user?._id === id);
                } else {
                    setIsOwner(false);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoggedUser(null);
                setIsOwner(false);
            }
        };

        fetchData();
    }, [id]); // Only depend on id

    return (
        <div className="profile">
            <ProfileHeader isOwner={isOwner} id={id} />
            <div className="profile-content">
                <h1 className="title">Favorite✨</h1>
                <ProfileCardCarrusel favorite={true} logged={loggedUser} id={id} />
            </div>
            <div className="profile-content">
                <h1 className="title">All templates</h1>
                <ProfileCardCarrusel favorite={false} logged={loggedUser} id={id} />
            </div>
        </div>
    );
}

export default Profile;