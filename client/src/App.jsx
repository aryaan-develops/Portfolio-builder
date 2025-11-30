import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preview from './components/Preview';
import EditorForm from './components/EditorForm';
import PublicPortfolio from './components/PublicPortfolio';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

// --- EDITOR PAGE (Protected Component) ---
const EditorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Initial State
  const [portfolioData, setPortfolioData] = useState({
    username: "", 
    theme: 'light',
    hero: { title: "Your Name", subtitle: "Your Bio", imgUrl: "" },
    social: { github: "", linkedin: "", twitter: "", email: "" },
    projects: [{ title: "My Project", desc: "Description...", link: "#" }],
    skills: []
  });

  // 1. Check Login on Load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      // Agar login nahi hai, to Login page par bhejo
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Data mein username set karo taaki URL sahi bane
      setPortfolioData(prev => ({ ...prev, username: parsedUser.username }));
    }
  }, [navigate]);

  // 2. Save Data to Backend
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      // Token header mein bhejna zaroori hai (Security ke liye)
      const config = { headers: { 'x-auth-token': token } };
      
      const res = await axios.post('http://localhost:5000/api/portfolio', portfolioData, config);
      alert(`Portfolio Saved! Check: /p/${portfolioData.username}`);
    } catch (error) {
      console.error(error);
      alert("Error saving data ❌");
    }
    setLoading(false);
  };

  // 3. Download HTML Code
  const downloadCode = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.hero.title} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="${portfolioData.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}">
    <header class="text-center py-20">
        <h1 class="text-5xl font-bold mb-4">${portfolioData.hero.title}</h1>
        <p class="text-xl opacity-80">${portfolioData.hero.subtitle}</p>
        <div class="mt-8 space-x-4">
            ${portfolioData.social.github ? `<a href="${portfolioData.social.github}" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">GitHub</a>` : ''}
            ${portfolioData.social.linkedin ? `<a href="${portfolioData.social.linkedin}" class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">LinkedIn</a>` : ''}
        </div>
    </header>
    <section class="max-w-4xl mx-auto mt-10 p-5">
        <h2 class="text-3xl font-bold border-b pb-2 mb-6">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${portfolioData.projects.map(p => `
            <div class="border p-4 rounded hover:shadow-md transition bg-opacity-10 bg-gray-400">
                <h3 class="font-bold text-xl">${p.title}</h3>
                <p class="text-sm mt-2">${p.desc}</p>
                <a href="${p.link}" class="text-blue-500 text-sm mt-4 block">View Project &rarr;</a>
            </div>
            `).join('')}
        </div>
    </section>
    <footer class="text-center py-10 opacity-50 text-sm"><p>Built with Portfolio Builder</p></footer>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden">
      {/* Left Side: Editor Form */}
      <div className="w-full md:w-[450px] h-full border-r border-gray-300 z-10 shadow-xl bg-gray-50 relative">
        
        {/* Logout Button (Small, Top Right) */}
        <button onClick={handleLogout} className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700 underline z-50 font-bold">
          Logout
        </button>
        
        <EditorForm 
          data={portfolioData} 
          updateData={setPortfolioData} 
          handleSave={handleSave} 
          handleDownload={downloadCode} 
        />
      </div>

      {/* Right Side: Live Preview */}
      <div className="flex-1 h-full p-4 md:p-10 flex justify-center items-center bg-gray-800">
        <div className="w-full h-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden ring-4 ring-gray-700 transform scale-95 transition-all">
          <Preview data={portfolioData} />
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Editor Route */}
      <Route path="/" element={<EditorPage />} />
      
      {/* Public Portfolio Route */}
      <Route path="/p/:username" element={<PublicPortfolio />} />
      
      <Route path="/about" element={<About />} />
    </Routes>

  );
}

export default App;