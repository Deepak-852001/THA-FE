const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // User model path
const router = express.Router();

router.post('/register', async (req, res) => {
  const { studentId, parentPhone, password } = req.body;

  // Validate inputs (you can add more robust validation here)
  if (!studentId || !parentPhone || !password) {
    return res.status(400).json({ errors: [{ msg: 'Please fill all fields.' }] });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      studentId,
      parentPhone,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ errors: [{ msg: 'Error registering user.' }] });
  }
});

module.exports = router;
