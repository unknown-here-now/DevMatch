import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import HelpWantedPage from './pages/HelpWantedPage';
import LoginPage from './pages/LoginPage';
import { UserProvider, useUser } from './contexts/UserContext';
import { Compass, Users, MessageCircle, User, HelpCircle, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

// Protected route wrapper
function ProtectedRoute() {
  const { isLoggedIn } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

// Layout for authenticated pages (includes Navbar and bottom navigation)
function AuthenticatedLayout() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="pb-20">
        <Outlet />
      </main>
      {/* Bottom Navigation Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center shadow-lg z-50">
        <NavLink to="/explore" className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-600'} transition-colors`}>
          <Compass className="w-6 h-6" />
          <span className="text-xs font-medium">Explore</span>
        </NavLink>
        <NavLink to="/help-wanted" className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-600'} transition-colors`}>
          <HelpCircle className="w-6 h-6" />
          <span className="text-xs font-medium">Help Wanted</span>
        </NavLink>
        <NavLink to="/matches" className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-600'} transition-colors`}>
          <Users className="w-6 h-6" />
          <span className="text-xs font-medium">Matches</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-600'} transition-colors`}>
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">Chat</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-600'} transition-colors`}>
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center space-y-1 text-gray-600 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

// Redirect based on authentication status
function AuthRedirect() {
  const { isLoggedIn } = useUser();
  
  if (isLoggedIn) {
    return <Navigate to="/explore" replace />;
  }
  
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<AuthRedirect />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/help-wanted" element={<HelpWantedPage />} />
            </Route>
          </Route>
          
          {/* Fallback redirect */}
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
