import React, { useState, useEffect } from 'react';
import './Dictation.css';

// Sample data for a single logged-in student
const student = { id: '001', name: 'Alice', level: 'junior' };

// Flashcard questions and answers per level and operation
const flashcards = {
    junior: {
        addition: [
            { question: '1 + 1', answer: '2' },
            { question: '2 + 2', answer: '4' },
            { question: '3 + 1', answer: '4' },
        ],
        subtraction: [
            { question: '2 - 1', answer: '1' },
            { question: '4 - 2', answer: '2' },
            { question: '5 - 3', answer: '2' },
        ],
        multiplication: [
            { question: '1 × 1', answer: '1' },
            { question: '2 × 2', answer: '4' },
            { question: '3 × 1', answer: '3' },
        ],
    },
};

const Dictation = () => {
    const [selectedOperation, setSelectedOperation] = useState('');
    const [showFlashcards, setShowFlashcards] = useState(false);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [answerStatus, setAnswerStatus] = useState('');
    const [timer, setTimer] = useState(15); // 15 seconds countdown
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [pageFlashColor, setPageFlashColor] = useState('');
    const [previousAnswer, setPreviousAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    // Automatically start the timer when the card is flipped
    useEffect(() => {
        let timerId;
        if (isTimerActive && timer > 0) {
            timerId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsFlipped(false);
            setIsTimerActive(false);
            setAnswerStatus('Time\'s up!');
            setPageFlashColor('red');
            setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards[student.level][selectedOperation].length);
        }
        return () => clearInterval(timerId);
    }, [isTimerActive, timer]);

    const handleOperationChange = (operation) => {
        setSelectedOperation(operation);
        setShowFlashcards(true);
        setCurrentFlashcardIndex(0);
        setIsFlipped(false);
        setTimer(15);
        setAnswerStatus('');
        setIsTimerActive(false);
        setPageFlashColor('');
        setPreviousAnswer('');
        setCorrectAnswer('');
    };

    const handleCardClick = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            setIsTimerActive(true);
        }
    };

    const handleVoiceRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please try Google Chrome.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const spokenAnswer = event.results[0][0].transcript.trim();
            const correctAnswerValue = flashcards[student.level][selectedOperation][currentFlashcardIndex].answer;

            setPreviousAnswer(spokenAnswer);
            setCorrectAnswer(correctAnswerValue);

            if (spokenAnswer === correctAnswerValue) {
                setAnswerStatus('Correct!');
                setPageFlashColor('green');
            } else {
                setAnswerStatus('Incorrect!');
                setPageFlashColor('red');
            }

            setIsFlipped(false);
            setIsTimerActive(false);
            setTimer(15);
            setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % flashcards[student.level][selectedOperation].length);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.start();
    };

    return (
        <div className={`dictation-page ${pageFlashColor}`} style={{ transition: 'background-color 0.5s' }}>
            <h1 className="dictation-title">Lets do more practice😍</h1>
            <h2 className="student-name">{student.name}'s Lessons</h2>

            <div className="dictation-options">
                <button className={`option-button ${selectedOperation === 'addition' ? 'active' : ''}`} onClick={() => handleOperationChange('addition')}>
                    Addition
                </button>
                <button className={`option-button ${selectedOperation === 'subtraction' ? 'active' : ''}`} onClick={() => handleOperationChange('subtraction')}>
                    Subtraction
                </button>
                <button className={`option-button ${selectedOperation === 'multiplication' ? 'active' : ''}`} onClick={() => handleOperationChange('multiplication')}>
                    Multiplication
                </button>
            </div>

            {showFlashcards && (
                <div className="flashcard-container" onClick={handleCardClick}>
                    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                        <div className="front">
                            <h3>{flashcards[student.level][selectedOperation][currentFlashcardIndex].question}</h3>
                        </div>
                        <div className="back">
                            <div className="beads">
                                {selectedOperation === 'multiplication' && (
                                    <>
                                        {Array.from({ length: currentFlashcardIndex + 1 }, (_, index) => (
                                            <div key={index} className="bead" />
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="excitement-icons">
                                <span role="img" aria-label="excitement">🎉</span>
                                <span role="img" aria-label="excitement">😃</span>
                                <span role="img" aria-label="excitement">🏆</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Timer Display */}
            {isFlipped && (
                <div className="timer">
                    <p style={{ fontSize: '2rem', color: 'black' }}>Time: {timer} sec</p>
                </div>
            )}

            {answerStatus && (
                <div className={`answer-status ${answerStatus === 'Correct!' ? 'correct' : 'incorrect'}`}>
                    <p>{answerStatus}</p>
                    <p>Your answer: {previousAnswer}</p>
                    {answerStatus === 'Incorrect!' && <p>The correct answer was: {correctAnswer}</p>}
                </div>
            )}
        </div>
    );
};

export default Dictation;
