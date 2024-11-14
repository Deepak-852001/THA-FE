import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css'; // Create a CSS file for styling

const Breadcrumb = ({ items }) => {
    return (
        <nav className="breadcrumb">
            {items.map((item, index) => (
                <span key={index}>
                    <Link to={item.path} className="breadcrumb-item">
                        {item.label}
                    </Link>
                    {index < items.length - 1 && <span className="separator"> / </span>}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
