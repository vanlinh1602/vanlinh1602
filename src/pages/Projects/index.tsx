import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Projects() {
  const [projects] = useState([
    {
      id: 1,
      name: 'E-commerce Platform',
      description:
        'Developed a full-stack e-commerce platform with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://github.com/yourusername/ecommerce-platform',
    },
    {
      id: 2,
      name: 'Task Management App',
      description:
        'Built a responsive task management application using React and Firebase',
      technologies: ['React', 'Firebase', 'Material-UI'],
      link: 'https://github.com/yourusername/task-manager',
    },
    {
      id: 3,
      name: 'Weather Forecast App',
      description:
        'Created a weather forecast application using React and OpenWeatherMap API',
      technologies: ['React', 'API Integration', 'Styled Components'],
      link: 'https://github.com/yourusername/weather-app',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <section id="projects" className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search projects"
          className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search projects"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white bg-opacity-10 p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {project.name}
            </h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-100 transition-colors duration-300"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
