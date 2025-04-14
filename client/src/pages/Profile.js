import React, { useEffect, useState } from 'react';
import './css/Profile.css';
import api from '../utils/api';
import { useParams } from "react-router"
import ProfileHeader from '../components/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileCardCarrusel from '../components/ProfileComponents/ProfileCardCarrusel/ProfileCardCarrusel';


function Profile() {
    const { id } = useParams();
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const response = await api.get(`/auth/logged`);
                setLoggedUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoggedUser(null);
            }
        };
        fetchLoggedUser();
    }, []);

    if (!loggedUser) return <div>Loading...</div>;

    return (
        <div className="profile">
            <ProfileHeader isOwner={loggedUser._id === id} id={id} />
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