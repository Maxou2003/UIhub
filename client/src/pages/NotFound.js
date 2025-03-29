import React from 'react';
import { Link } from 'react-router-dom';
import "./css/NotFound.css";

function NotFound() {
    return (
        <div className="not-found">
            <div className='not-found-container'>
                <h1>404</h1>
                <p>Oops! Page not found</p>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/">Return to Homepage</Link>
            </div>
        </div>
    );
}

export default NotFound;