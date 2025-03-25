import React, { useState } from "react";
import './ProfileHeader.css';
import axios from 'axios';

function ProfileHeader() {

    return (
        <div className="profile-header">
            <div className="profile-header-container">
                <div className="profile-header-items">
                    <div className="profile-header-banner">
                        <img src="https://dummyimage.com/1250x300/d96b32/ba" alt="profile banner" />
                    </div>
                    <div className="profile-header-info-container">
                        <div className="profile-header-avatar">
                            <img src="https://avatar.iran.liara.run/public" alt="profile image" />
                        </div>
                        <div className="profile-header-info">
                            <div className="profile-header-info-user">
                                <h1>Username</h1>
                                <p>47 templates</p>
                            </div>
                            <div className="profile-header-actions">
                                <button className="profile-header-button">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default ProfileHeader;