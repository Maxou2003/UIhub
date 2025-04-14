import React, { useEffect, useState } from 'react';
import MainContent from '../components/HomeMainContent/HomeMainContent';
import api from '../utils/api';
import { isConnected } from '../utils/connected';

function Home() {

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
        if (isConnected) {
            fetchLoggedUser();
        }
    }, [isConnected]);
    return (

        <div className="Home">
            <MainContent logged={loggedUSer} />
        </div>
    );
}
export default Home;




