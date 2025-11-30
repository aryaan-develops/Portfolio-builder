const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SECRET KEY (Isse hum .env file mein rakhenge ideally)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check agar user pehle se hai
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Username already taken" });

    // Password Encrypt karna
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user banana
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhoondho
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Token Generate karo
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;