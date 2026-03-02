import { useState } from 'react';
import { Edit2, Save, Github, MapPin, Calendar, BookOpen, Code, Briefcase } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(['React', 'Node.js', 'TypeScript', 'Tailwind CSS']);
  const [interests, setInterests] = useState(['SaaS', 'Open Source', 'AI/ML', 'Web3']);
  const [currentProjects, setCurrentProjects] = useState(['Dev-Match Platform', 'Campus Event App']);
  const [githubUsername, setGithubUsername] = useState('yourusername');
  const [location, setLocation] = useState('Main Campus');
  const [semester, setSemester] = useState('5th');
  const [department, setDepartment] = useState('Computer Science');

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newProject, setNewProject] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addProject = () => {
    if (newProject.trim() && !currentProjects.includes(newProject.trim())) {
      setCurrentProjects([...currentProjects, newProject.trim()]);
      setNewProject('');
    }
  };

  const removeProject = (project: string) => {
    setCurrentProjects(currentProjects.filter(p => p !== project));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl"></div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center text-gray-600">
                    <Github className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <span>github.com/{githubUsername}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <span>{location}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <span>{semester} Semester</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <span>{department}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-indigo-600 hover:text-indigo-900"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  <span>{interest}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="ml-2 text-green-600 hover:text-green-900"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={addInterest}
                  className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Current Projects
            </h3>
            <ul className="space-y-2 mb-4">
              {currentProjects.map((project) => (
                <li key={project} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span>{project}</span>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeProject(project)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Add a project"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Note: Listing current projects helps others understand your availability and interests.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4">Profile Strength</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Complete</span>
                  <span className="text-sm font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>GitHub connected</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Skills added</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Projects listed</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Add more interests</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Matches</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects Joined</span>
                <span className="font-bold">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profile Views</span>
                <span className="font-bold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Swipe Right Rate</span>
                <span className="font-bold">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4">GitHub Contributions</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-2">Connect your GitHub to show contributions</p>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                Connect GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}