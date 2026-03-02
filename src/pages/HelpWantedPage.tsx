import { Plus, Users, Calendar, MapPin, Code, MessageCircle, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const helpPosts = [
  {
    id: 1,
    title: 'SaaS Platform for Student Collaboration',
    description: 'Building a platform where students can find teammates for projects and hackathons. Need frontend and backend developers.',
    skillsNeeded: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
    peopleNeeded: 2,
    postedBy: 'Alex Chen',
    postedDate: '2024-03-15',
    location: 'Main Campus',
    urgency: 'high',
  },
  {
    id: 2,
    title: 'AI-powered Campus Navigation',
    description: 'Developing an AR campus navigation app using machine learning for pathfinding. Looking for ML engineers and mobile developers.',
    skillsNeeded: ['Python', 'TensorFlow', 'React Native', 'AR'],
    peopleNeeded: 3,
    postedBy: 'Priya Sharma',
    postedDate: '2024-03-14',
    location: 'East Campus',
    urgency: 'medium',
  },
  {
    id: 3,
    title: 'Blockchain-based Certificate Verification',
    description: 'Creating a decentralized system for verifying academic certificates. Need blockchain developers and smart contract experts.',
    skillsNeeded: ['Solidity', 'Web3.js', 'Node.js', 'IPFS'],
    peopleNeeded: 2,
    postedBy: 'Rohan Kumar',
    postedDate: '2024-03-13',
    location: 'Main Campus',
    urgency: 'high',
  },
  {
    id: 4,
    title: 'Mental Health Chatbot for Students',
    description: 'Building an AI chatbot to provide mental health support. Seeking NLP specialists and UI/UX designers.',
    skillsNeeded: ['Python', 'NLP', 'React', 'Figma'],
    peopleNeeded: 3,
    postedBy: 'Sneha Patel',
    postedDate: '2024-03-12',
    location: 'West Campus',
    urgency: 'medium',
  },
  {
    id: 5,
    title: 'Sustainable Energy Monitoring System',
    description: 'IoT project to monitor energy consumption in campus buildings. Need hardware and full-stack developers.',
    skillsNeeded: ['IoT', 'Python', 'React', 'Cloud'],
    peopleNeeded: 4,
    postedBy: 'Amit Singh',
    postedDate: '2024-03-11',
    location: 'All Campuses',
    urgency: 'low',
  },
  {
    id: 6,
    title: 'E-commerce Platform for Campus Businesses',
    description: 'Creating a marketplace for student entrepreneurs to sell products. Looking for full-stack and payment integration experts.',
    skillsNeeded: ['Next.js', 'Stripe', 'PostgreSQL', 'Docker'],
    peopleNeeded: 2,
    postedBy: 'Neha Gupta',
    postedDate: '2024-03-10',
    location: 'Main Campus',
    urgency: 'medium',
  },
];

export default function HelpWantedPage() {
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    skillsNeeded: '',
    peopleNeeded: 1,
    location: 'Main Campus',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the post
    setShowForm(false);
    setNewPost({
      title: '',
      description: '',
      skillsNeeded: '',
      peopleNeeded: 1,
      location: 'Main Campus',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help Wanted Board</h1>
          <p className="text-gray-600">Find projects that need your skills or post your own project needs</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 lg:mt-0 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post Help Needed
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Post Your Project Needs</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="e.g., Building a SaaS platform"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  rows={4}
                  placeholder="Describe your project and what help you need..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills Needed (comma separated)</label>
                  <input
                    type="text"
                    value={newPost.skillsNeeded}
                    onChange={(e) => setNewPost({ ...newPost, skillsNeeded: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="React, Node.js, UI/UX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of People Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newPost.peopleNeeded}
                    onChange={(e) => setNewPost({ ...newPost, peopleNeeded: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="Main Campus">Main Campus</option>
                  <option value="East Campus">East Campus</option>
                  <option value="West Campus">West Campus</option>
                  <option value="All Campuses">All Campuses</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Post to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {helpPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-xl text-gray-900">{post.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${post.urgency === 'high' ? 'bg-red-100 text-red-800' :
                        post.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                      }`}>
                      {post.urgency === 'high' ? 'Urgent' : post.urgency === 'medium' ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Skills Needed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.skillsNeeded.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{post.peopleNeeded} people needed</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Posted {post.postedDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">By {post.postedBy}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Express Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need Help with Your Project?</h2>
            <p className="text-cyan-100 max-w-2xl">
              Don't let your project idea die because you can't find the right teammates. Post your project needs
              and let qualified developers find you.
            </p>
          </div>
          <button className="mt-4 lg:mt-0 px-6 py-3 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100">
            How It Works
          </button>
        </div>
      </div>
    </div>
  );
}