import React from 'react';
import { FaTrash, FaPlus, FaSave, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const EditorForm = ({ data, updateData, handleSave, handleDownload }) => {
  
  // 1. Generic Handler for nested objects (Hero, Social)
  const handleChange = (section, field, value) => {
    updateData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // 2. Handler for Projects Array (Complex Logic)
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index][field] = value;
    updateData((prev) => ({ ...prev, projects: newProjects }));
  };

  // 3. Add New Project
  const addProject = () => {
    updateData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "New Project", desc: "Description...", link: "#" }]
    }));
  };

  // 4. Remove Project
  const removeProject = (index) => {
    const newProjects = data.projects.filter((_, i) => i !== index);
    updateData((prev) => ({ ...prev, projects: newProjects }));
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto text-gray-800 pb-24 scrollbar-hide">
      
      {/* --- HEADER & ACTIONS --- */}
      <div className="flex flex-col gap-4 mb-8 border-b pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">⚡ Editor</h2>
          <div className="flex gap-2">
            {/* Download Button */}
            <button 
              onClick={handleDownload}
              className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700 transition flex items-center gap-2 text-sm font-semibold"
              title="Download Code"
            >
              <FaDownload /> Code
            </button>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              className="bg-green-600 text-white p-2 rounded shadow hover:bg-green-700 transition flex items-center gap-2 text-sm font-semibold"
              title="Save to Database"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-purple-600 border-b pb-2">👤 Hero Section</h3>
        
        <div className="mb-3">
          <label className="text-xs font-bold text-gray-500 uppercase">Main Title / Name</label>
          <input 
            type="text" 
            value={data.hero.title}
            onChange={(e) => handleChange('hero', 'title', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
        </div>

        <div className="mb-3">
          <label className="text-xs font-bold text-gray-500 uppercase">Subtitle / Bio</label>
          <textarea 
            rows="3"
            value={data.hero.subtitle}
            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
        </div>
      </div>

      {/* --- SOCIAL LINKS --- */}
      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-blue-600 border-b pb-2">🌐 Social Links</h3>
        
        <div className="mb-3">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><FaGithub/> GitHub URL</label>
          <input 
            type="text" 
            value={data.social.github}
            onChange={(e) => handleChange('social', 'github', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none transition"
            placeholder="https://github.com/..."
          />
        </div>

        <div className="mb-3">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><FaLinkedin/> LinkedIn URL</label>
          <input 
            type="text" 
            value={data.social.linkedin}
            onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none transition"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-indigo-600">🚀 Projects</h3>
          <button 
            onClick={addProject} 
            className="flex items-center gap-1 text-xs font-bold bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-200 transition"
          >
            <FaPlus /> ADD PROJECT
          </button>
        </div>

        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative group hover:shadow-md transition">
              
              {/* Delete Icon */}
              <button 
                onClick={() => removeProject(index)}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition p-1"
                title="Delete Project"
              >
                <FaTrash />
              </button>

              <div className="mb-2">
                <label className="text-xs font-bold text-gray-400">Title</label>
                <input 
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="w-full p-1.5 border rounded text-sm focus:ring-1 focus:ring-indigo-300 outline-none"
                />
              </div>

              <div className="mb-2">
                <label className="text-xs font-bold text-gray-400">Description</label>
                <textarea 
                  rows="2"
                  value={project.desc}
                  onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                  className="w-full p-1.5 border rounded text-sm focus:ring-1 focus:ring-indigo-300 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400">Project Link</label>
                <input 
                  type="text"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  className="w-full p-1.5 border rounded text-sm focus:ring-1 focus:ring-indigo-300 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- THEME TOGGLE --- */}
      <div className="mt-8 mb-4">
        <button 
            onClick={() => updateData(prev => ({...prev, theme: prev.theme === 'light' ? 'dark' : 'light'}))}
            className={`w-full py-3 rounded-lg font-bold shadow transition ${data.theme === 'light' ? 'bg-gray-800 text-white hover:bg-black' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
          >
            Switch to {data.theme === 'light' ? 'Dark 🌙' : 'Light ☀️'} Mode
        </button>
      </div>

    </div>
  );
};

export default EditorForm;