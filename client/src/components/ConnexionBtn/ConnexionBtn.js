import React from 'react';
import './ConnexionBtn.css';

function ConnexionBtn() {

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        console.log(typeof (localStorage.getItem('token')));
        console.log(`token :${localStorage.getItem('token')}`);
        console.log(`user :${localStorage.getItem('user')}`);
    }

    if (localStorage.getItem('token') === null) {

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