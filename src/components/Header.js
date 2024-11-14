import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure to create this CSS file for styling

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo">
                <h1>Abacus Learning Platform</h1>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/dictation">Dictation</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
