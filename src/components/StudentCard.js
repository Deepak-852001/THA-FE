// src/components/StudentCard.js
import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h2>{student.name}</h2>
      <p>Time Spent: {student.timeSpent} minutes</p>
      <p>Highest Score: {student.highestScore}</p>
      <p>Level: {student.level}</p>
      <p>Areas to Improve: {student.areasToImprove.join(', ')}</p>
    </div>
  );
};

export default StudentCard;
