import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Change this line
import './Category.css';

const Category = () => {
    const { level } = useParams();
    const navigate = useNavigate(); // Change this line

    const handleCategorySelect = (category) => {
        navigate(`/dictation/game/${level}/${category}`); // Change this line
    };

    return (
        <div className="category-container">
            <h2>{`Selected Level: ${level}`}</h2>
            <h3>Select a Game</h3>
            <button onClick={() => handleCategorySelect('FlashCard')}>FlashCard</button>
            <button onClick={() => handleCategorySelect('Sums Dictation')}>Sums Dictation</button>
        </div>
    );
};

export default Category;
