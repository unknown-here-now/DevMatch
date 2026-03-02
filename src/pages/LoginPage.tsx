import { useState } from 'react';
import { Github, Mail, Lock, User, BookOpen, MapPin, Code, Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

// Mock GitHub user data for simulation
const mockGitHubUsers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    semester: '5th',
    department: 'Computer Science',
    location: 'Main Campus',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    interests: ['SaaS', 'Open Source', 'AI/ML', 'Web3'],
    currentProjects: ['Dev-Match Platform', 'Campus Event App'],
    github: 'johndoe',
  },
  {
    id: 2,
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    semester: '5th',
    department: 'Computer Science',
    location: 'Main Campus',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    interests: ['SaaS', 'AI/ML', 'Open Source'],
    currentProjects: ['E-commerce platform', 'Student portal redesign'],
    github: 'alexchen',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    semester: '4th',
    department: 'Information Technology',
    location: 'East Campus',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    interests: ['Data Science', 'Web3', 'UI/UX'],
    currentProjects: ['Attendance tracking system', 'Chatbot'],
    github: 'priyasharma',
  },
];

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [semester, setSemester] = useState('5th');
  const [location, setLocation] = useState('Main Campus');

  const handleGitHubLogin = () => {
    // Simulate GitHub OAuth: pick a random mock user
    const randomUser = mockGitHubUsers[Math.floor(Math.random() * mockGitHubUsers.length)];
    login(randomUser);
    navigate('/explore');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    // Simulate login with mock user
    const mockUser = mockGitHubUsers[0]; // default user
    login(mockUser);
    navigate('/explore');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !githubUsername) {
      alert('Please fill all required fields');
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      semester,
      department,
      location,
      skills: ['JavaScript', 'React', 'Node.js'], // default skills
      interests: ['Web Development', 'Open Source'],
      currentProjects: ['New Project'],
      github: githubUsername,
    };
    login(newUser);
    navigate('/explore');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Dev-Match</span>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding and info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Find your perfect <span className="text-indigo-600">tech teammate</span> on campus
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              Connect with developers, designers, and creators. Build amazing projects together. Swipe, match, and collaborate.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Smart Matching</h3>
                <p className="text-gray-600">Find teammates based on skills, interests, and project needs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Campus-Focused</h3>
                <p className="text-gray-600">Connect with students from your university and nearby colleges</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Project Board</h3>
                <p className="text-gray-600">Post "Help Wanted" ads for your projects and find skilled collaborators</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login/Signup card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex-1 py-4 text-center font-medium text-lg ${isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium text-lg ${!isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <>
              <div className="space-y-6">
                <button
                  onClick={handleGitHubLogin}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span className="font-medium">Continue with GitHub</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="student@college.edu"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Username *</label>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="johndoe"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">GitHub is mandatory for verification and collaboration</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="student@college.edu"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Computer Engineering</option>
                    <option>Software Engineering</option>
                    <option>Electronics & Communication</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                    <option>8th</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campus Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>Main Campus</option>
                  <option>East Campus</option>
                  <option>West Campus</option>
                  <option>North Campus</option>
                  <option>South Campus</option>
                  <option>Off-Campus</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Create Account
              </button>
              <p className="text-center text-gray-600 text-sm">
                By signing up, you agree to our Terms and Privacy Policy
              </p>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Dev-Match is a platform for students to find teammates across campuses. Start collaborating today!</p>
      </div>
    </div>
  );
}