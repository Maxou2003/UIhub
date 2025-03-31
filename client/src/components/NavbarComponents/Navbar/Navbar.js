// import React, { useEffect, useState, useRef } from 'react';
// import './Navbar.css';
// import { IonIcon } from '@ionic/react';
// import { home, person, logOut } from 'ionicons/icons';
// import ConnexionBtn from '../ConnexionBtn/ConnexionBtn';
// import api from '../../../utils/api';
// import connected from '../../../utils/connected';
// import { Link } from 'react-router-dom';

// function Navbar() {
//     const [profileImage, setProfileImage] = useState(null);
//     const [username, setUsername] = useState('Username');
//     const [showSettings, setShowSettings] = useState(false);
//     const settingsRef = useRef(null);

//     useEffect(() => {
//         const fetchProfileImage = async () => {
//             try {
//                 const response = await api.get('profile/image', {
//                     responseType: 'arraybuffer'
//                 });
//                 const base64 = btoa(
//                     new Uint8Array(response.data).reduce(
//                         (data, byte) => data + String.fromCharCode(byte), ''
//                     )
//                 );
//                 setProfileImage(`data:image/png;base64,${base64}`);
//             } catch (error) {
//                 console.log('Error fetching profile image:', error);
//                 setProfileImage(null);
//             }
//         };
//         const fetchUserInfo = async () => {
//             try {
//                 const response = await api.get('profile/');
//                 setUsername(response.data.username);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchProfileImage();
//         fetchUserInfo();

//         // Close settings when clicking outside
//         const handleClickOutside = (event) => {
//             if (settingsRef.current && !settingsRef.current.contains(event.target)) {
//                 setShowSettings(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const toggleSettings = () => {
//         setShowSettings(!showSettings);
//     };
//     const handleLogOut = () => {
//         localStorage.removeItem('key');
//         localStorage.clear();
//     }

//     if (localStorage.getItem('key') && (JSON.parse(localStorage.getItem('key')).expiry < new Date().getTime())) {
//         handleLogOut();
//     }

//     return (
//         <div className="navbar">
//             <div className="logo">
//                 <Link to="/" className="navbar-brand">
//                     <span>UIhub</span>
//                 </Link>
//             </div>
//             <nav className="nav-links">
//                 <Link to="/" className="nav-item">
//                     <IonIcon icon={home} />
//                     <span> Home </span>
//                 </Link>
//                 <Link to="/profile" className="nav-item">
//                     <IonIcon icon={person} />
//                     <span> Profile </span>
//                 </Link>

//                 <ConnexionBtn />
//                 {connected &&
//                     <div
//                         className='navbar-profile-img'
//                         onClick={toggleSettings}
//                         ref={settingsRef}
//                         style={{ cursor: 'pointer' }}
//                     >
//                         {profileImage ? (
//                             <img src={profileImage} alt="Profile" />
//                         ) : (
//                             <div className="profile-placeholder">
//                                 <IonIcon icon={person} style={{ fontSize: '24px' }} />
//                             </div>
//                         )}
//                     </div>
//                 }
//             </nav>

//             <div className={`setting_menu ${showSettings ? 'setting_menu_height' : ''}`}>
//                 <div id="dark_btn" className="dark_btn_on">
//                     <span></span>
//                 </div>

//                 <div className="settings_menu_inner">
//                     <div className="user_profile">
//                         {profileImage ? (
//                             <div className='menu-inner-profile'>
//                                 <img src={profileImage} alt="Profile" />
//                             </div>
//                         ) : (
//                             <div className="profile-icon-small">
//                                 <IonIcon icon={person} />
//                             </div>
//                         )}
//                         <div className='username'>
//                             {username}
//                         </div>
//                     </div>
//                     <hr />
//                     <div className="setting_link" onClick={handleLogOut} >
//                         <IonIcon icon={logOut} className="setting_icon" />
//                         <a href="/">Logout</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;

import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { IonIcon } from '@ionic/react';
import { home, person, logOut } from 'ionicons/icons';
import ConnexionBtn from '../ConnexionBtn/ConnexionBtn';
import api from '../../../utils/api';
import { isConnected } from '../../../utils/connected'; // Import the function now
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('Username');
    const [showSettings, setShowSettings] = useState(false);
    const [connected, setConnected] = useState(isConnected()); // Local state
    const settingsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check connection status whenever localStorage changes
        const handleStorageChange = () => {
            setConnected(isConnected());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (!connected) return; // Only fetch if connected

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
                console.log('Error fetching profile image:', error);
                setProfileImage(null);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await api.get('profile/');
                setUsername(response.data.username);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileImage();
        fetchUserInfo();

        // Close settings when clicking outside
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [connected]); // Re-run when connection status changes

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleLogOut = () => {
        localStorage.removeItem('key');
        setConnected(false); // Update local state
        setProfileImage(null); // Clear profile image
        setShowSettings(false); // Close settings menu
        navigate('/'); // Redirect to home
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
                <Link to="/profile" className="nav-item">
                    <IonIcon icon={person} />
                    <span> Profile </span>
                </Link>
                <ConnexionBtn onLogin={() => setConnected(true)} />
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
                        <a href="/">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;