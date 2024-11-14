import React, { useEffect, useCallback, useState } from 'react';

const Games = () => {
    const levels = {
        junior: [1, 2, 3, 4],
        foundation: [1, 2, 3, 4],
        advance: [1, 2, 3],
        grandMaster: [1, 2, 3]
    };

    const [currentLevel, setCurrentLevel] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const generateQuestions = useCallback(() => {
        if (!currentLevel) return;

        // Example logic to generate questions based on the selected level
        const levelQuestions = [];

        for (let i = 0; i < 5; i++) { // Generate 5 questions
            const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
            const num2 = Math.floor(Math.random() * 10) + 1;
            const question = {
                question: `What is ${num1} + ${num2}?`,
                answer: num1 + num2
            };
            levelQuestions.push(question);
        }

        setQuestions(levelQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers({});
        setIsGameOver(false);
    }, [currentLevel]);

    useEffect(() => {
        generateQuestions();
    }, [generateQuestions]);

    const handleAnswerChange = (e) => {
        const { value } = e.target;
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: value
        });
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];

        if (parseInt(userAnswers[currentQuestionIndex]) === currentQuestion.answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const handleRestart = () => {
        generateQuestions();
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h1>Game Page</h1>
            {isGameOver ? (
                <div>
                    <h2>Game Over</h2>
                    <p>Your score: {score} out of {questions.length}</p>
                    <button onClick={handleRestart}>Play Again</button>
                </div>
            ) : (
                questions.length > 0 && (
                    <div>
                        <h2>{questions[currentQuestionIndex].question}</h2>
                        <form onSubmit={handleSubmitAnswer}>
                            <input
                                type="number"
                                value={userAnswers[currentQuestionIndex] || ''}
                                onChange={handleAnswerChange}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )
            )}
            <div style={{ marginTop: '20px' }}>
                <h3>Select Level to Start</h3>
                {Object.keys(levels).map(level => (
                    <button key={level} onClick={() => setCurrentLevel(level)}>
                        {level.charAt(0).toUpperCase() + level.slice(1)} Level
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Games;
