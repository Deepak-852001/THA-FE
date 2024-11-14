import React, { useState } from 'react';
import axios from 'axios';

const GameComponent = ({ level }) => {
  const [sum, setSum] = useState(generateSum(level));
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post('/api/game/submit', { sum, answer });
    if (response.data.correct) {
      setFeedback('Correct!');
      setSum(generateSum(level));  // Generate new sum
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <div>
      <h1>Abacus Game - {level}</h1>
      <p>{sum}</p>
      <input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{feedback}</p>
    </div>
  );
};

const generateSum = (level) => {
  // Logic to generate a math sum based on the level
  return "5 + 3";  // Example
};

export default GameComponent;
