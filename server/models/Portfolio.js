// server/models/Portfolio.js
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  // Ye unique ID hogi URL ke liye (eg: mysite.com/p/rohan)
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  // Design Theme (Advanced feature)
  theme: {
    type: String,
    default: 'light' // options: 'dark', 'light', 'retro'
  },

  // Hero Section (Top part of website)
  hero: {
    title: { type: String, default: "Hello, I'm a Developer" },
    subtitle: { type: String, default: "I build things for the web." },
    imgUrl: { type: String, default: "" } // Image ka link
  },

  // Projects (Array - kyunki multiple projects honge)
  projects: [
    {
      title: String,
      desc: String,
      link: String,
      coverImg: String
    }
  ],

  // Skills (Simple list)
  skills: [String], // e.g. ["React", "Node.js"]

  // Social Links
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    email: String
  }

}, { timestamps: true }); // timestamps: true se 'created_at' date auto save hogi

module.exports = mongoose.model('Portfolio', PortfolioSchema);