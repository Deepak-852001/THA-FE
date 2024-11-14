import React from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CSVLink } from 'react-csv';
import './Dashboard.css';

// Dummy student data
const studentData = [
    {
        id: '034256',
        name: 'Alice',
        pointsEarned: 300,
        level: 'Advanced',
        achievements: ['Completed Level 4', 'Best Performer'],
        dailyTracker: [
            { date: '2023-09-01', hoursStudied: 2 },
            { date: '2023-09-02', hoursStudied: 3 },
            { date: '2023-09-08', hoursStudied: 4 },
            { date: '2023-09-10', hoursStudied: 2 },
            { date: '2023-09-15', hoursStudied: 5 },
        ],
    },
    {
        id: '782526',
        name: 'Bob',
        pointsEarned: 250,
        level: 'Intermediate',
        achievements: ['Completed Level 3', 'Most Improved'],
        dailyTracker: [
            { date: '2023-09-01', hoursStudied: 1 },
            { date: '2023-09-02', hoursStudied: 2 },
            { date: '2023-09-08', hoursStudied: 3 },
            { date: '2023-09-09', hoursStudied: 1 },
            { date: '2023-09-12', hoursStudied: 4 },
        ],
    },
];

// Sample logged-in student (you would get this from authentication context or state)
const loggedInStudentId = '034256'; // Replace this with the logged-in student's ID

const Dashboard = () => {
    const loggedInStudent = studentData.find(student => student.id === loggedInStudentId);
    if (!loggedInStudent) return <div>Student not found</div>; // Handle case where student isn't found

    const { name, pointsEarned, achievements, dailyTracker } = loggedInStudent;

    // Pie chart data
    const pieData = [
        { name: 'Points Earned', value: pointsEarned, fill: '#4CAF50' },
        { name: 'Points Remaining', value: 1000 - pointsEarned, fill: '#FF5722' }, // Assuming 1000 as a target
    ];

    // Bar chart data
    const barChartData = [
        { name: 'Points', points: pointsEarned },
    ];

    // Line chart data
    const lineChartData = dailyTracker.map(tracker => ({
        date: tracker.date,
        hoursStudied: tracker.hoursStudied,
    }));

    // Function to prepare weekly data for CSV
    const prepareWeeklyData = () => {
        const weeklyData = {};
        dailyTracker.forEach(tracker => {
            const date = new Date(tracker.date);
            const weekNumber = getWeekNumber(date);
            const year = date.getFullYear();
            const weekKey = `${year}-W${weekNumber}`;
            
            if (!weeklyData[weekKey]) {
                weeklyData[weekKey] = {
                    id: loggedInStudentId,
                    name,
                    pointsEarned,
                    achievements: achievements.join(', '),
                    hoursStudied: 0,
                };
            }
            weeklyData[weekKey].hoursStudied += tracker.hoursStudied;
        });

        return Object.values(weeklyData);
    };

    // Get week number from date
    const getWeekNumber = (date) => {
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + firstJan.getDay() + 1) / 7);
    };

    const csvData = prepareWeeklyData();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {name}</h1>
                <div className="student-id">
                    <span>ID: {loggedInStudentId}</span>
                    <i className="fas fa-user-circle"></i> {/* Using Font Awesome for the icon */}
                </div>
            </header>
            <div className="earnings-box">
                <h2>Total Points Earned: <span className="points">{pointsEarned}</span></h2>
            </div>
            <div className="report-container">
                <div className="charts-wrapper">
                    <div className="chart-section pie-chart">
                        <h2>Points Breakdown</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip />
                                <Legend />
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-section bar-chart">
                        <h2>Points Earned</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <Tooltip />
                                <Bar dataKey="points" fill="#42A5F5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-section line-chart">
                        <h2>Daily Study Hours</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineChartData}>
                                <Tooltip />
                                <Line type="monotone" dataKey="hoursStudied" stroke="#FFEB3B" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="student-details">
                    <h3>Student Details</h3>
                    <p><strong>Achievements:</strong> {achievements.join(', ')}</p>
                    <p><strong>Earned Points:</strong> {pointsEarned}</p>
                    <p><strong>Hours Completed:</strong> {dailyTracker.reduce((total, tracker) => total + tracker.hoursStudied, 0)} hours</p>
                </div>
            </div>
            <div className="download-button-container">
                <CSVLink data={csvData} headers={[
                    { label: 'ID', key: 'id' },
                    { label: 'Name', key: 'name' },
                    { label: 'Points Earned', key: 'pointsEarned' },
                    { label: 'Achievements', key: 'achievements' },
                    { label: 'Hours Studied', key: 'hoursStudied' },
                ]} filename={"weekly-student-report.csv"}>
                    <button className="download-button">Download Weekly Report</button>
                </CSVLink>
            </div>
        </div>
    );
};

export default Dashboard;
