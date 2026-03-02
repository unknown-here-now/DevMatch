import { MapPin, Calendar, BookOpen, Code, Github } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface DeveloperCardProps {
  developer: {
    id: number;
    name: string;
    avatar: string;
    semester: string;
    department: string;
    location: string;
    skills: string[];
    interests: string[];
    currentProjects: string[];
    github: string;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function DeveloperCard({ developer, onSwipeLeft, onSwipeRight }: DeveloperCardProps) {
  const handlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="absolute -bottom-12 left-8">
          <img
            src={developer.avatar}
            alt={developer.name}
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg"
          />
        </div>
      </div>
      
      <div className="pt-16 pb-8 px-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{developer.name}</h2>
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{developer.semester} Semester</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span className="text-sm">{developer.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{developer.location}</span>
              </div>
            </div>
          </div>
          <a
            href={`https://github.com/${developer.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold text-lg flex items-center mb-2">
            <Code className="w-5 h-5 mr-2" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {developer.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Current Projects</h3>
          <ul className="space-y-2">
            {developer.currentProjects.map((project) => (
              <li key={project} className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">{project}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Looking for teammates to collaborate on innovative projects. Let's build something amazing together!
          </p>
        </div>
      </div>
    </div>
  );
}
