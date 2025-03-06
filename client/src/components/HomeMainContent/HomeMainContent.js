import React from 'react';
import './HomeMainContent.css';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import Card from '../Card/Card';

function MainContent() {
    return (
        <div className="main-content">
            <div className="mycontainer">
                <div className="typewriter">
                    <h1>Welcome to UIhub</h1>
                </div>
            </div>

            <p>Explore our amazing features and designs!</p>
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
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default MainContent;