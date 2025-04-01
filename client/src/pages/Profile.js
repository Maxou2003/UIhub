import React, { useEffect, useState } from 'react';
import './css/Profile.css';
import api from '../utils/api';
import { useParams } from "react-router"
import ProfileHeader from '../components/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileCardCarrusel from '../components/ProfileComponents/ProfileCardCarrusel/ProfileCardCarrusel';


function Profile() {

    let { id } = useParams();
    const [loggedUSer, setLoggedUser] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {

        const fetchLoggedUser = async () => {
            try {
                const response = await api.get(`/auth/logged`);
                setLoggedUser(response.data.user);
                setIsOwner(response.data.user._id == id);
                console.log("isOwner", response.data.user._id == id);
                console.log('loggedUSer', loggedUSer);
                console.log('isOwner', isOwner);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchLoggedUser();
    }, []);

    return (
        <div className="profile">
            <ProfileHeader isOwner={isOwner} id={id} />
            <div className="profile-content">
                <h1 className="title">Favorite✨</h1>
                <ProfileCardCarrusel favorite={true} logged={loggedUSer} isOwner={isOwner} id={id} />
            </div>
            <div className="profile-content">
                <h1 className="title">All templates</h1>
                <ProfileCardCarrusel favorite={false} logged={loggedUSer} isOwner={isOwner} id={id} />
            </div>
        </div>
    );
}
export default Profile;