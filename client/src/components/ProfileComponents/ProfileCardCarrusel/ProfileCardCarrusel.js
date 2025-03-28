import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';
import Card from '../../Card/Card';
import api from '../../../api';
import './ProfileCardCarrusel.css';



function ProfileCardCarroussel({ favorite }) {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const nbCards = 3;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('profile/');
                if (favorite) {
                    setCards(response.data.favorite);
                } else {
                    setCards(response.data.template);
                }

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNext = () => {
        if (currentIndex + nbCards >= cards.length) return;
        setCurrentIndex(currentIndex + nbCards);
    }

    const handlePrevious = () => {
        if (currentIndex - nbCards < 0) return;
        setCurrentIndex(currentIndex - nbCards);
    }

    if (loading) {
        return (
            <div className="profile-card-carrusel">
                <div className="loader">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                </div>
            </div>);
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
        <div className="profile-card-carrusel">
            <IonIcon onClick={handlePrevious} className="chevron back-chevron" icon={chevronBack} />
            {cards.filter((card, index) => index >= currentIndex && index < currentIndex + nbCards).map((card, index) => (
                < Card key={index} htmlString={card.html} cssString={card.css} />
            ))}
            <IonIcon onClick={handleNext} className="chevron forward-chevron" icon={chevronForward} />
        </div>
    );

}

export default ProfileCardCarroussel;