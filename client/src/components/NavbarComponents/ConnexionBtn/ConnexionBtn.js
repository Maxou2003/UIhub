import React from 'react';
import './ConnexionBtn.css';

function ConnexionBtn() {

    const handleLogOut = () => {
        localStorage.removeItem('key');
        localStorage.clear();
    }
    if (localStorage.getItem('key') && (JSON.parse(localStorage.getItem('key')).expiry < new Date().getTime())) {
        handleLogOut();
    }

    if (localStorage.getItem('key') === null) {

        return (
            <div className='ConnexionBtnContainer'>
                <a href="/login" className="nav-item">
                    <button className="login-btn"> Log In </button>
                </a>
                <a href="/signup" className="nav-item">
                    <button className="button2">Sign Up</button>
                </a>
            </div>
        );

    } else {
        return (
            <div className='ConnexionBtnContainer'>
                <a href="/" className="nav-item">
                    <button className="button2" onClick={handleLogOut}>Log out</button>
                </a>
            </div >
        );
    }

}
export default ConnexionBtn;