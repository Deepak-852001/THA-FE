// FlashcardSection.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './FlashcardSection.css'; // Add styles as needed

const FlashcardSection = () => {
    const { level } = useParams();

    // Sample flashcards data (you would probably fetch this from an API or database)
    const flashcards = {
        beginner: ['Cat', 'Dog', 'Apple', 'Tree'],
        intermediate: ['Elephant', 'Giraffe', 'Banana', 'Mountain'],
        advanced: ['Pineapple', 'Kangaroo', 'Technology', 'Philosophy'],
    };

    return (
        <div className="flashcard-section">
            <h2>Flashcards - Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h2>
            <div className="flashcards-container">
                {flashcards[level].map((word, index) => (
                    <div key={index} className="flashcard">
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardSection;
