import { useState } from 'react';
import { Save, Bell, Lock, User, Mail } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function SettingsPage() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [profileVisible, setProfileVisible] = useState('public');
  
  const handleSave = () => {
    alert('Settings saved!');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Username</label>
              <input
                type="text"
                defaultValue={user?.github}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">New Matches</p>
                <p className="text-sm text-gray-600">Get notified when someone swipes right on you</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Updates</p>
                <p className="text-sm text-gray-600">Receive email summaries of your activity</p>
              </div>
              <button
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`w-12 h-6 rounded-full transition-colors ${emailUpdates ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${emailUpdates ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Privacy
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
              <select
                value={profileVisible}
                onChange={(e) => setProfileVisible(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="public">Public (Anyone on campus)</option>
                <option value="university">University Only</option>
                <option value="campus">My Campus Only</option>
                <option value="private">Private (Only matches)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{user?.github ? user.github + '@github.com' : 'Not set'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}