import React from 'react';
import './ConnexionBtn.css';
import { IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { isConnected } from '../../../utils/connected'
import { Link } from 'react-router-dom';

function ConnexionBtn() {

    if (!isConnected()) {
        return (
            <div className='ConnexionBtnContainer'>
                <Link to="/login" className="nav-item">
                    <button className="login-btn">Log In</button>
                </Link>
                <Link to="/signup" className="nav-item">
                    <button className="button2">Sign Up</button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className='ConnexionBtnContainer'>
                <Link to="/create" className="nav-item">
                    <button className="button2 create-btn">
                        <IonIcon icon={add} className="create-icon" />
                        <span>Create</span>
                    </button>
                </Link>
            </div>
        );
    }
}
export default ConnexionBtn;