import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Feature data
const featuresData = [
    {
        icon: '📊',
        title: 'Dashboard',
        description: 'View your progress at a glance and stay motivated.'
    },
    {
        icon: '🗺️',
        title: 'Learning Path',
        description: 'Follow a tailored learning path that suits your goals.'
    },
    {
        icon: '🏆',
        title: 'Compete with Friends',
        description: 'Challenge your friends and earn bragging rights!'
    },
    {
        icon: '📈',
        title: 'Score Report',
        description: 'Get detailed insights into your performance and improvement areas.'
    },
    {
        icon: '🧩',
        title: 'Personalized Experience',
        description: 'Tailor your learning path based on your preferences and goals.'
    },
    {
        icon: '🎮',
        title: 'Fun Math Games',
        description: 'Challenge yourself with exciting math games that improve your mental skills!'
    }
];

const Home = () => {
    return (
        <div className="home-container">
            {/* Header Section */}
            <header className="header">
                <h1 className="app-name">The Bead App</h1>
                <nav className="nav-links">
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/register" className="nav-button">Get Started</Link>
                </nav>
            </header>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Side: Hero Section */}
                <div className="hero-section">
                    <h2 className="hero-title">Experience the Power of Learning</h2>
                    <p className="hero-subtitle">Join us for an exciting journey of knowledge and growth!</p>
                    <div className="cta-buttons">
                        <Link to="/login" className="cta-button">Login</Link>
                        <Link to="/register" className="cta-button">Get Started</Link>
                    </div>
                </div>

                {/* Right Side: Features Section */}
                <section className="features">
                    <h2 className="features-title">Explore Our Features</h2>
                    <div className="feature-cards">
                        {featuresData.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
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

export default Home;
