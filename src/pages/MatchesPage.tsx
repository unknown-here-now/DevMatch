import { MessageCircle, Users, Calendar } from 'lucide-react';

const matches = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMatch',
    matchedDate: '2024-03-15',
    skills: ['React', 'Node.js'],
    commonInterests: ['SaaS', 'Open Source'],
    project: 'E-commerce platform',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaMatch',
    matchedDate: '2024-03-10',
    skills: ['Python', 'Django'],
    commonInterests: ['Data Science', 'Web3'],
    project: 'Attendance tracking system',
  },
  {
    id: 3,
    name: 'Rohan Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanMatch',
    matchedDate: '2024-03-05',
    skills: ['Java', 'AWS'],
    commonInterests: ['Cloud Computing', 'DevOps'],
    project: 'Cloud migration project',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaMatch',
    matchedDate: '2024-03-01',
    skills: ['React Native', 'Firebase'],
    commonInterests: ['Mobile Apps', 'AR/VR'],
    project: 'Fitness app',
  },
  {
    id: 5,
    name: 'Amit Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmitMatch',
    matchedDate: '2024-02-28',
    skills: ['UI/UX', 'Figma'],
    commonInterests: ['Design Systems', 'Product Design'],
    project: 'Campus navigation redesign',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NehaMatch',
    matchedDate: '2024-02-25',
    skills: ['Machine Learning', 'Python'],
    commonInterests: ['AI/ML', 'Research'],
    project: 'Student performance prediction',
  },
];

export default function MatchesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
          <p className="text-gray-600">Connect with developers who are interested in collaborating</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">
            <Users className="inline w-4 h-4 mr-2" />
            {matches.length} matches
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Start New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={match.avatar}
                  alt={match.name}
                  className="w-16 h-16 rounded-xl border-2 border-white shadow"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{match.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Matched {match.matchedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {match.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Common Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {match.commonInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Project</h4>
                <p className="text-gray-800">{match.project}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                    View Profile
                  </button>
                  <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Start a Team Project</h2>
            <p className="text-indigo-100 max-w-2xl">
              Have a project idea? Invite your matches to collaborate and build something amazing together.
              The best projects often start with a simple conversation.
            </p>
          </div>
          <button className="mt-4 lg:mt-0 px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100">
            Create Project Room
          </button>
        </div>
      </div>
    </div>
  );
}