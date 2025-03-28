import React, { useEffect, useState } from 'react';
import './HomeMainContent.css';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import Card from '../Card/Card';
import api from '../../api';

function MainContent() {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('template/');
                setCards(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
        <div className="main-content">
            <div className="mycontainer">
                <div className="typewriter">
                    <h1>Welcome to UIHub</h1>
                    <p className="subtitle">Explore our amazing features and designs!</p>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className="search-container">
                            <input type="text" className="form-control search-input" placeholder="Search..." />
                            <IonIcon className='search-icon' icon={search} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-gallery">
                {cards.templates.map((card, index) => (
                    <Card key={index} htmlString={card.html} cssString={card.css} />
                ))}
            </div>
        </div>
    );
}

export default MainContent;