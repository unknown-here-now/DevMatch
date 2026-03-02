import { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChat',
    lastMessage: 'Hey! I reviewed your code, looks great!',
    timestamp: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaChat',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Rohan Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanChat',
    lastMessage: 'I pushed the latest changes to GitHub',
    timestamp: '2 days ago',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Sneha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaChat',
    lastMessage: 'Let me know when you are free for the UI review',
    timestamp: '3 days ago',
    unread: 1,
    online: true,
  },
];

const messages = [
  { id: 1, sender: 'alex', content: 'Hi! I saw your profile and noticed you are working on a SaaS project.', time: '10:15 AM' },
  { id: 2, sender: 'you', content: 'Yes! I\'m building a student collaboration platform. Are you interested?', time: '10:16 AM' },
  { id: 3, sender: 'alex', content: 'Absolutely! I have experience with React and Node.js. I can help with both frontend and backend.', time: '10:18 AM' },
  { id: 4, sender: 'alex', content: 'I also noticed you\'re looking for a UI/UX designer. My friend Priya is excellent at design.', time: '10:20 AM' },
  { id: 5, sender: 'you', content: 'That would be perfect! Can we set up a call to discuss the project architecture?', time: '10:22 AM' },
  { id: 6, sender: 'alex', content: 'Sure! How about tomorrow at 3 PM? I can share my screen and show some of my previous work.', time: '10:30 AM' },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, you would send the message
      setMessageInput('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${activeChat.id === conv.id ? 'bg-indigo-50' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-xl" />
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-500">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-lg" />
              <div>
                <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${msg.sender === 'you'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                      }`}
                  >
                    <p>{msg.content}</p>
                    <div
                      className={`text-xs mt-2 ${msg.sender === 'you' ? 'text-indigo-200' : 'text-gray-500'
                        }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button className="absolute right-3 top-3">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={sendMessage}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Chat securely within Dev-Match. All messages are encrypted.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-bold text-lg mb-4">Chat Guidelines</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">1</span>
            </div>
            <p className="text-gray-700">Discuss project ideas and share GitHub links</p>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">2</span>
            </div>
            <p className="text-gray-700">Schedule video calls for team meetings</p>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">3</span>
            </div>
            <p className="text-gray-700">Be respectful and professional in all communications</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
