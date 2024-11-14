// NumberDictationSection.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NumberDictationSection.css'; // Add styles as needed

const NumberDictationSection = () => {
    const { level } = useParams();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const numberDictations = {
        beginner: [1, 2, 3],
        intermediate: [10, 20, 30],
        advanced: [100, 200, 300],
    };

    const getRandomNumber = () => {
        const numbers = numberDictations[level];
        return numbers[Math.floor(Math.random() * numbers.length)];
    };

    const [currentNumber, setCurrentNumber] = useState(getRandomNumber());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(inputValue) === currentNumber) {
            alert('Correct!');
            setCurrentNumber(getRandomNumber());
            setInputValue('');
        } else {
            alert('Try Again!');
        }
    };

    return (
        <div className="number-dictation-section">
            <h2>Number Dictation - Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h2>
            <p>Listen to the number: <strong>{currentNumber}</strong></p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder="Enter the number" 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NumberDictationSection;
