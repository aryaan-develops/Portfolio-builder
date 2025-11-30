import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* --- BACKGROUND VIDEO --- */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="ab1.mp4" type="video/mp4" />
      </video>

      {/* --- DARK OVERLAY --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>

      {/* --- MAIN CONTENT (Z-Index 10 to stay above video) --- */}
      <div className="relative z-10">
        
        {/* --- NAVBAR --- */}
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            PortfolioBuilder 🚀
          </div>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold">
              Get Started
            </Link>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <div className="text-center py-20 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Build Your <span className="text-blue-500">Identity.</span> <br />
            Showcase Your <span className="text-purple-500">Work.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
            The fastest way to create a professional developer portfolio. 
            No coding required for the design—just fill, preview, and export.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:scale-105 transition shadow-lg shadow-purple-500/30">
              Start Building Free
            </Link>
            <Link to="/login" className="px-8 py-4 border border-gray-400 rounded-full font-bold text-lg hover:bg-gray-800/50 hover:border-white transition backdrop-blur-sm">
              Login
            </Link>
          </div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">Why use PortfolioBuilder?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition hover:-translate-y-2">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">
                Real-time preview means what you type is exactly what you see. No reloading required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition hover:-translate-y-2">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold mb-3">Export Code</h3>
              <p className="text-gray-400">
                Don't want to host with us? Download the full HTML/CSS code and host it anywhere (GitHub Pages, Netlify).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition hover:-translate-y-2">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">Secure & Scaleable</h3>
              <p className="text-gray-400">
                Built with the MERN stack (MongoDB, Express, React, Node) and secured with JWT Authentication.
              </p>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="border-t border-gray-800 py-10 text-center text-gray-500 mt-10 backdrop-blur-sm bg-black/20">
          <p>&copy; 2024 PortfolioBuilder. Made with ❤️ for Developers.</p>
        </footer>

      </div>
    </div>
  );
};

export default About;