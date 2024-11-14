import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Importing the new Home component
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Dictation from './pages/Dictation';
import Game from './pages/Games';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Homepage route */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/dictation" element={<Dictation />} /> {/* Dictation page */}
        <Route path="/game/:level/:category" element={<Game />} /> {/* Game page */}
        <Route path="/register" element={<Register />} /> {/* Registration page */}
      </Routes>
    </Router>
  );
};

export default App;
