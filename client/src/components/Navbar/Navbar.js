import React from 'react';
import './Navbar.css';
import { IonIcon } from '@ionic/react'; // Install @ionic/react if needed
import { home, person } from 'ionicons/icons';

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <a href="/" className="navbar-brand">
                    <span>UIhub</span>
                </a>
            </div>
            <nav className="nav-links">
                <a href="/" className="nav-item">
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

export default Navbar;