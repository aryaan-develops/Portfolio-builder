import React from 'react';

const Preview = ({ data }) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-white shadow-lg rounded-lg">
      {/* Theme Wrapper */}
      <div className={`min-h-full p-10 ${data.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        
        {/* HERO SECTION */}
        <header className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">{data.hero.title}</h1>
          <p className="text-xl opacity-80">{data.hero.subtitle}</p>
          
          <div className="mt-8 space-x-4">
            {/* Social Links agar exist karte hain tabhi dikhao */}
            {data.social.github && (
              <a href={data.social.github} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">GitHub</a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">LinkedIn</a>
            )}
          </div>
        </header>

        {/* PROJECTS SECTION */}
        <section className="mt-10">
          <h2 className="text-3xl font-bold border-b pb-2 mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border p-4 rounded hover:shadow-md transition bg-opacity-10 bg-gray-400">
                <h3 className="font-bold text-xl">{project.title}</h3>
                <p className="text-sm mt-2">{project.desc}</p>
                <a href={project.link} className="text-blue-500 text-sm mt-4 block">View Project &rarr;</a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Preview;