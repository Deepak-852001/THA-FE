import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressChart from './ProgressChart';
import StudentCard from './client/src/components/StudentCard';


const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await axios.get('/api/students/123');  // Fetch student by ID
      setStudentData(response.data);
    };
    fetchStudentData();
  }, []);

  return (
    <div>
      {studentData ? (
        <>
          <StudentCard student={studentData} />
          <ProgressChart data={studentData.progress} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
