import React from 'react';
import { Link } from 'react-router-dom';
// import './SelectionPage.css';


const SelectionPage = () => {
    return (
        <div className="home-container">
            

            {/* Main Content */}
            <div className="main-content">
                {/* Left Side: Hero Section */}
                <div className="hero-section">
                    <h2 className="hero-title">Experience the Power of Learning</h2>
                    <p className="hero-subtitle">Join us for an exciting journey of knowledge and growth!</p>
                    <div className="cta-buttons">
                        <Link to="/dashboard" className="cta-button">Dashboard</Link>
                        <Link to="/PracticePage" className="cta-button">Practice</Link>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <p>Join the fun and sharpen your skills with Abacus Learning!</p>
                <p>Follow us: 
                    <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">Twitter</a>, 
                    <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a>, 
                    <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">Instagram</a>
                </p>
            </footer>
        </div>
    );
};

export default SelectionPage;
