// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; // Include custom CSS for better styling

const Register = () => {
    const [studentName, setStudentName] = useState('');
    const [currentLevel, setCurrentLevel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [centerName, setCenterName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(studentName, currentLevel, password, confirmPassword)
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!', { position: 'top-right' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentName,
                    password,
                    currentLevel,
                    centerName,
                    emailId
                }),
            });

            const result = await response.json();
            console.log(result)
            
            // Assuming the registration API call happens here
            // Simulating successful registration
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                navigate('/login');
                toast.success('Registration Successful! Redirecting to login...', { position: 'top-right' });
            }, 3000);
        } catch (error) {
            toast.error('Registration failed, try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Create Your Account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>
                    Student Name:
                    <input 
                        type="text" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)} 
                        placeholder="Enter your student ID" 
                        required
                    />
                </label>
                <label>
                    Student Current Level:
                    <input 
                        type="text" 
                        value={currentLevel}
                        onChange={(e) => setCurrentLevel(e.target.value)} 
                        placeholder="Enter parent's phone number" 
                        required
                    />
                </label>
                <label>
                    Center Name:
                    <input 
                        type="text" 
                        value={centerName}
                        onChange={(e) => setCenterName(e.target.value)} 
                        placeholder="Confirm your password" 
                        required
                    />
                </label>
                <label>
                    Email Id:
                    <input 
                        type="text" 
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)} 
                        placeholder="Confirm your password" 
                        required
                    />
                </label>
                <label>
                    Create Password:
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Create a password" 
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm your password" 
                        required
                    />
                </label>
                <button type="submit" className="register-button">Register</button>
            </form>
            
            <ToastContainer />
            
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                className="custom-modal"
                overlayClassName="custom-overlay"
                contentLabel="Registration Success Modal"
            >
                <h2>🎉 Registration Successful! 🎉</h2>
                <p>Welcome to the Abacus Learning Platform!</p>
                <p>Redirecting you to the login page...</p>
            </Modal>
        </div>
    );
};

export default Register;
