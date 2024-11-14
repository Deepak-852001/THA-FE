const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Registration Route
router.post('/register', [
  body('studentId').isLength({ min: 1 }).withMessage('Student ID is required.'),
  body('parentPhoneNumber').isLength({ min: 1 }).withMessage('Parent Phone Number is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must match.');
    }
    return true;
  }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { studentId, parentPhoneNumber, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ studentId });
  if (existingUser) {
    return res.status(400).json({ errors: [{ msg: 'User already exists.' }] });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    studentId,
    parentPhoneNumber,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: 'User created successfully!' });
});

// Login Route
router.post('/login', [
  body('studentId').isLength({ min: 1 }).withMessage('Student ID is required.'),
  body('password').isLength({ min: 1 }).withMessage('Password is required.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { studentId, password } = req.body;
  const user = await User.findOne({ studentId });
  
  if (!user) {
    return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
  }

  // Ideally, generate a JWT token here for authenticated users
  res.status(200).json({ message: 'Login successful!' });
});

module.exports = router;
