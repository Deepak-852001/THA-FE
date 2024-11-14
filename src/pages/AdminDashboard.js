import React from 'react';
import './AdminDashboard.css';

// Dummy student data
const studentData = [
    {
        id: '034256',
        name: 'Alice',
        pointsEarned: 300,
        level: 'Advanced',
        achievements: ['Completed Level 4', 'Best Performer'],
    },
    {
        id: '096378',
        name: 'Bob',
        pointsEarned: 250,
        level: 'Intermediate',
        achievements: ['Completed Level 3', 'Most Improved'],
    },
    // ... more student data
];

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="student-records">
                {studentData.map(student => (
                    <div className="student-card" key={student.id}>
                        <h2>{student.name}</h2>
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>Points Earned:</strong> {student.pointsEarned}</p>
                        <p><strong>Level:</strong> {student.level}</p>
                        <p><strong>Achievements:</strong> {student.achievements.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
