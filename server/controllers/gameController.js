const Student = require('../models/Student');

exports.submitAnswer = async (req, res) => {
    const { sum, answer, studentId } = req.body;
    
    const correctAnswer = eval(sum); // Simplified logic for demo purposes
    const isCorrect = parseInt(answer) === correctAnswer;

    try {
        const student = await Student.findById(studentId);
        if (student) {
            student.timeSpent += 1;  // Example: Increment time spent
            student.progress.push({ date: new Date(), score: isCorrect ? 10 : 0 });
            await student.save();
        }

        res.json({ correct: isCorrect });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting answer' });
    }
};
