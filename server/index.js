// server/index.js
const authRoute = require('./routes/auth');
const Portfolio = require('./models/Portfolio');
require('dotenv').config(); // Environment variables load karne ke liye
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // JSON data samajhne ke liye
app.use(cors()); // React ko allow karne ke liye
app.use('/api/auth', authRoute);
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully ✅"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// Test Route
app.get('/', (req, res) => {
  res.send('Portfolio Builder Backend is Running! 🚀');
});
// 1. CREATE or UPDATE Portfolio (POST Route)
app.post('/api/portfolio', async (req, res) => {
  try {
    const { username, hero, projects, skills, social } = req.body;

    // Check agar user pehle se exist karta hai, toh update karo, nahi toh naya banao
    let portfolio = await Portfolio.findOne({ username });

    if (portfolio) {
      // Update logic (hum baad mein detail mein dekhenge, abhi simple rakhte hain)
      portfolio.hero = hero;
      portfolio.projects = projects;
      portfolio.skills = skills;
      portfolio.social = social;
      await portfolio.save();
      return res.json({ msg: "Portfolio Updated", data: portfolio });
    }

    // Create New
    const newPortfolio = new Portfolio({
      username,
      hero,
      projects,
      skills,
      social
    });

    await newPortfolio.save();
    res.json({ msg: "Portfolio Created Successfully", data: newPortfolio });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// 2. GET Portfolio by Username (Jise public dekhegi)
app.get('/api/portfolio/:username', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ username: req.params.username });
    
    if (!portfolio) return res.status(404).json({ msg: "Portfolio not found" });

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});