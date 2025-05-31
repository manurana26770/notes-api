const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    return next(new Error('Name, email, and password are required'));
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      return next(new Error('Email already registered'));
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err); // use centralized error handler
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    return next(new Error('Email and password are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      return next(new Error('Invalid Email '));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400);
      return next(new Error('Invalid Password'));
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
