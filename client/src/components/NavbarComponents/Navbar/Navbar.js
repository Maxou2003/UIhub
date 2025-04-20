import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { IonIcon } from '@ionic/react';
import { home, person, logOut, compass } from 'ionicons/icons';
import NavbarBtn from '../NavbarBtn/NavbarBtn';
import api from '../../../utils/api';
import { isConnected } from '../../../utils/connected';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('Username');
    const [userId, setUserId] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [connected, setConnected] = useState(isConnected());
    const settingsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setConnected(isConnected());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (!connected) return;

        const fetchProfileImage = async () => {
            try {
                const response = await api.get('profile/image', {
                    responseType: 'arraybuffer'
                });
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''
                    )
                );
                setProfileImage(`data:image/png;base64,${base64}`);
            } catch (error) {
                console.error('Error fetching profile image:', error);
                setProfileImage(null);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await api.get('auth/logged/');
                setUsername(response.data.user.username);
                const ownerId = response.data.user._id;
                setUserId(ownerId);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfileImage();
        fetchUserInfo();

        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [connected]);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleLogOut = () => {
        localStorage.removeItem('key');
        setConnected(false);
        setProfileImage(null);
        setShowSettings(false);
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/" className="navbar-brand">
                    <span>UIhub</span>
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/" className="nav-item">
                    <IonIcon icon={home} />
                    <span> Home </span>
                </Link>
                <Link to="/explorer" className="nav-item">
                    <IonIcon icon={compass} />
                    <span> Explore </span>
                </Link>
                {connected &&
                    <Link to={`/profile/${userId}`} className="nav-item">
                        <IonIcon icon={person} />
                        <span> Profile </span>
                    </Link>}
                <NavbarBtn />
                {connected && (
                    <div
                        className='navbar-profile-img'
                        onClick={toggleSettings}
                        ref={settingsRef}
                        style={{ cursor: 'pointer' }}
                    >
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" />
                        ) : (
                            <div className="profile-placeholder">
                                <IonIcon icon={person} style={{ fontSize: '24px' }} />
                            </div>
                        )}
                    </div>
                )}
            </nav>
            <div className={`setting_menu ${showSettings ? 'setting_menu_height' : ''}`}>
                <div id="dark_btn" className="dark_btn_on">
                    <span></span>
                </div>

                <div className="settings_menu_inner">
                    <div className="user_profile">
                        {profileImage ? (
                            <div className='menu-inner-profile'>
                                <img src={profileImage} alt="Profile" />
                            </div>
                        ) : (
                            <div className="profile-icon-small">
                                <IonIcon icon={person} />
                            </div>
                        )}
                        <div className='username'>
                            {username}
                        </div>
                    </div>
                    <hr />
                    <div className="setting_link" onClick={handleLogOut} >
                        <IonIcon icon={logOut} className="setting_icon" />
                        Logout
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Navbar;