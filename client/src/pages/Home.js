import React, { useEffect, useState } from 'react';
import MainContent from '../components/HomeMainContent/HomeMainContent';
import api from '../utils/api';

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
        fetchLoggedUser();
    }, []);
    return (

        <div className="Home">
            <MainContent logged={loggedUSer} />
        </div>
    );
}
export default Home;




