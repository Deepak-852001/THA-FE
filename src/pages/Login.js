import React, { useState } from 'react';
import './Login.css'; // Ensure you create a CSS file for styling
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [studentName, setStudentName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Add your login logic here

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentName,
                    password
                }),
            });

            const result = await response.json();
            if(result.message === "Login successful") {
                setModalIsOpen(true);
                setTimeout(() => {
                    setModalIsOpen(false);
                    navigate('/dashboard');
                    toast.success('Login Successful! Redirecting to dashboard...', { position: 'top-right' });
                }, 3000);
            }
        }
        catch(error) {
            console.log(error.error)
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="studentId">Student Name</label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="register-prompt">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
            <ToastContainer />
            
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                className="custom-modal"
                overlayClassName="custom-overlay"
                contentLabel="Registration Success Modal"
            >
                <h2>🎉 Login Successful! 🎉</h2>
                <p>Redirecting you to the dashborad page...</p>
            </Modal>
        </div>
    );
};

export default Login;
