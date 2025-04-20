import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';
import Card from '../../Card/Card';
import api from '../../../utils/api';
import { isConnected } from '../../../utils/connected';
import './ProfileCardCarrusel.css';



function ProfileCardCarroussel({ favorite, logged, id }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const nbCards = 3;
    const isOwner = logged?._id === id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = isOwner ? 'profile/' : `profile/${id}`;
                const response = await api.get(endpoint);

                // Filter public templates if not owner
                const templates = isOwner
                    ? response.data.template
                    : response.data.template?.filter(t => t.public) || [];

                setCards(favorite
                    ? templates.filter(t => t.favorite)
                    : templates
                );
            } catch (error) {
                setError(error);
                console.error("ProfileCarrousel error", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, favorite, isOwner]);

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
                < Card key={index} htmlString={card.html} cssString={card.css} id={card._id} logged={logged} owner={card.owner} profile={true} />
            ))}
            <IonIcon onClick={handleNext} className="chevron forward-chevron" icon={chevronForward} />
        </div>
    );

}

export default ProfileCardCarroussel;