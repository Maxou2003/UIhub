import React from 'react';
import './Header.css';
import { IonIcon } from '@ionic/react'; // Install @ionic/react if needed
import { home, person } from 'ionicons/icons';

function Header() {
    return (
        <div className="navbar">
            <div className="logo">
                <a href="/home" className="navbar-brand">
                    <span>UIhub</span>
                </a>
            </div>
            <nav className="nav-links">
                <a href="/home" className="nav-item">
                    <IonIcon icon={home} />
                    <span> Home </span>
                </a>
                <a href="/profile" className="nav-item">
                    <IonIcon icon={person} />
                    <span> Profile </span>
                </a>
            </nav>
        </div>
    );
}

export default Header;