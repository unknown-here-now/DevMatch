import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // Check mobile menu
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target) && !mobileMenuButtonRef.current?.contains(target)) {
        setMobileMenuOpen(false);
      }
      // Check notifications dropdown
      if (notificationsOpen && notificationsRef.current && !notificationsRef.current.contains(target) && !notificationsButtonRef.current?.contains(target)) {
        setNotificationsOpen(false);
      }
      // Check profile dropdown
      if (profileDropdownOpen && profileDropdownRef.current && !profileDropdownRef.current.contains(target) && !profileButtonRef.current?.contains(target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, notificationsOpen, profileDropdownOpen]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close other dropdowns if open
    if (notificationsOpen) setNotificationsOpen(false);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    // Close other dropdowns if open
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };
  
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    // Close other dropdowns if open
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Mock notifications
  const notifications = [
    { id: 1, text: 'Alex Chen swiped right on you!', time: '5 min ago' },
    { id: 2, text: 'New match: Priya Sharma', time: '1 hour ago' },
    { id: 3, text: 'Message from Rohan Kumar', time: '2 hours ago' },
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            ref={mobileMenuButtonRef}
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Dev-Match
          </Link>
          <span className="text-xs text-gray-500 bg-indigo-50 px-2 py-1 rounded-full">Campus</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search developers..."
              className="w-64 px-4 py-2 pl-10 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>
          
          <div className="relative" ref={notificationsRef}>
            <button 
              ref={notificationsButtonRef}
              onClick={toggleNotifications}
              className="relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                </div>
                {notifications.map(notif => (
                  <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                    <p className="text-sm text-gray-800">{notif.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 w-full text-center">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative" ref={profileDropdownRef}>
            <div 
              ref={profileButtonRef}
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                {user?.name || 'You'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">{user?.name || 'Guest User'}</h3>
                  <p className="text-sm text-gray-500">{user?.department || 'Computer Science'}</p>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-gray-100 text-gray-700"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-gray-100 text-gray-700"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-gray-100 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown with backdrop */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div 
            ref={mobileMenuRef}
            className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 md:hidden"
          >
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full"></div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user?.name || 'Guest User'}</h3>
                    <p className="text-sm text-gray-500">{user?.department || 'Computer Science'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/explore" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="w-5 h-5" />
                  <span>Explore</span>
                </Link>
                <Link 
                  to="/help-wanted" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bell className="w-5 h-5" />
                  <span>Help Wanted</span>
                </Link>
                <Link 
                  to="/matches" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Matches</span>
                </Link>
                <Link 
                  to="/chat" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bell className="w-5 h-5" />
                  <span>Chat</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              </div>
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button 
                  onClick={() => {
                    navigate('/settings');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-red-600 w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}