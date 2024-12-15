import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to DecentraDocs Platform</h1>
            <p className="home-description">This platform allows users to upload and view research data securely on the blockchain.</p>
            <div className="home-nav-links">
                <Link to="/login" className="home-nav-link">Login</Link> |
                <Link to="/register" className="home-nav-link">Register</Link>
            </div>
        </div>
    );
}

export default Home;