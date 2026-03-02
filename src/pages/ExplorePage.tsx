import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import DeveloperCard from '../components/DeveloperCard';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import { useUser } from '../contexts/UserContext';

// Mock data for developers
const mockDevelopers = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    name: 'Rohan Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    semester: '6th',
    department: 'Computer Engineering',
    location: 'Main Campus',
    skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'],
    interests: ['Cloud Computing', 'DevOps', 'Microservices'],
    currentProjects: ['Cloud migration project', 'CI/CD pipeline'],
    github: 'rohank',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    semester: '3rd',
    department: 'Software Engineering',
    location: 'West Campus',
    skills: ['JavaScript', 'React Native', 'Firebase', 'GraphQL'],
    interests: ['Mobile Apps', 'AR/VR', 'Game Dev'],
    currentProjects: ['Fitness app', 'Campus navigation AR'],
    github: 'snehap',
  },
  {
    id: 5,
    name: 'Amit Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    semester: '7th',
    department: 'Electronics & Communication',
    location: 'East Campus',
    skills: ['IoT', 'Python', 'React', 'Cloud'],
    interests: ['Hardware', 'Embedded Systems'],
    currentProjects: ['Energy monitoring system'],
    github: 'amitsingh',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
    semester: '2nd',
    department: 'Computer Science',
    location: 'Main Campus',
    skills: ['Machine Learning', 'Python', 'TensorFlow'],
    interests: ['AI/ML', 'Research'],
    currentProjects: ['Student performance prediction'],
    github: 'nehagupta',
  },
];

export default function ExplorePage() {
  const { user, addMatch } = useUser();
  const [developers] = useState(mockDevelopers);
  const [filteredDevelopers, setFilteredDevelopers] = useState(mockDevelopers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [matchNotification, setMatchNotification] = useState<string | null>(null);
  
  // Initialize filters with user's location as default
  const [filters, setFilters] = useState<FilterState>({
    selectedSkills: [],
    selectedLocation: user?.location ? user.location.toLowerCase().split(' ')[0] : 'campus',
    selectedSemester: '',
    selectedDepartment: '',
  });

  // Apply filters whenever filters or developers change
  useEffect(() => {
    let result = developers;
    
    // Filter by location
    if (filters.selectedLocation === 'campus') {
      // Show only developers in the same campus as user
      if (user?.location) {
        result = result.filter(dev => dev.location === user.location);
      }
    } else if (filters.selectedLocation === 'university') {
      // Show developers from all campuses (university colleges)
      // No location filter needed
    } else if (filters.selectedLocation === 'all') {
      // Show all India (all developers)
      // No location filter needed
    }
    
    // Filter by semester
    if (filters.selectedSemester) {
      result = result.filter(dev => dev.semester === filters.selectedSemester);
    }
    
    // Filter by department
    if (filters.selectedDepartment) {
      result = result.filter(dev => dev.department === filters.selectedDepartment);
    }
    
    // Filter by skills (if any skill selected, match any of them)
    if (filters.selectedSkills.length > 0) {
      result = result.filter(dev => 
        filters.selectedSkills.some(skill => dev.skills.includes(skill))
      );
    }
    
    setFilteredDevelopers(result);
    // Reset current index when filtered list changes
    setCurrentIndex(0);
  }, [filters, user]);

  const handleSwipeLeft = () => {
    if (currentIndex < filteredDevelopers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const handleSwipeRight = () => {
    const matchedDeveloper = filteredDevelopers[currentIndex];
    console.log('Matched with', matchedDeveloper);
    addMatch(matchedDeveloper);
    setMatchNotification(`You matched with ${matchedDeveloper.name}!`);
    setTimeout(() => setMatchNotification(null), 3000);
    if (currentIndex < filteredDevelopers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      selectedSkills: [],
      selectedLocation: user?.location ? user.location.toLowerCase().split(' ')[0] : 'campus',
      selectedSemester: '',
      selectedDepartment: '',
    });
  };

  const currentDeveloper = filteredDevelopers[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Teammates</h1>
          <p className="text-gray-600">Swipe right to connect, left to skip</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50"
        >
          {showFilters ? 'Hide Filters' : 'Filters'}
        </button>
      </div>

      {matchNotification && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 flex justify-between items-center">
          <span>{matchNotification}</span>
          <button onClick={() => setMatchNotification(null)} className="text-green-600 hover:text-green-800">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentDeveloper ? (
            <DeveloperCard
              developer={currentDeveloper}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <p className="text-gray-500">No developers match your filters. Try adjusting them!</p>
            </div>
          )}

          <div className="flex justify-center space-x-8 mt-8">
            <button
              onClick={handleSwipeLeft}
              className="p-4 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
            <button
              onClick={handleSwipeRight}
              className="p-4 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </button>
          </div>
        </div>

        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel 
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
          
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-lg mb-4">How it works</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-bold">1</span>
                </div>
                <span>Swipe right on developers you'd like to team up with</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-bold">2</span>
                </div>
                <span>If they also swipe right, it's a match!</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-bold">3</span>
                </div>
                <span>Chat with your matches and start collaborating</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}