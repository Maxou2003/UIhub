import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';
import axios from 'axios';
import Card from '../Card/Card';
import './ProfileCardCarrusel.css';


function ProfileCardCarroussel() {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const nbCards = 3;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/template/');
                setCards(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleNext = () => {
        if (currentIndex + nbCards >= cards.templates.length) return;
        setCurrentIndex(currentIndex + nbCards);
    }

    const handlePrevious = () => {
        if (currentIndex - nbCards < 0) return;
        setCurrentIndex(currentIndex - nbCards);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="profile-card-carrusel">
            <IonIcon onClick={handlePrevious} className="chevron back-chevron" icon={chevronBack} />
            {cards.templates.filter((card, index) => index >= currentIndex && index < currentIndex + nbCards).map((card, index) => (
                < Card key={index} htmlString={card.html} cssString={card.css} />
            ))}
            <IonIcon onClick={handleNext} className="chevron forward-chevron" icon={chevronForward} />
        </div>
    );
}

export default ProfileCardCarroussel;