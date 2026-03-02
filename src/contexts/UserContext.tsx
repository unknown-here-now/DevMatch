import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
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

type Match = {
  id: number;
  userId: number;
  matchedUserId: number;
  matchedDate: string;
  matchedUserName: string;
  matchedUserAvatar: string;
  matchedUserSkills: string[];
  matchedUserInterests: string[];
  matchedUserProject: string;
};

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  matches: Match[];
  addMatch: (matchedUser: User) => void;
  removeMatch: (matchId: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>(() => {
    const stored = localStorage.getItem('dev-match-matches');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('dev-match-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setMatches([]);
    localStorage.removeItem('dev-match-user');
    localStorage.removeItem('dev-match-matches');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('dev-match-user', JSON.stringify(updatedUser));
    }
  };

  const addMatch = (matchedUser: User) => {
    // Check if match already exists
    if (matches.some(m => m.matchedUserId === matchedUser.id)) {
      return;
    }
    const newMatch: Match = {
      id: Date.now(),
      userId: user?.id || 0,
      matchedUserId: matchedUser.id,
      matchedDate: new Date().toISOString().split('T')[0],
      matchedUserName: matchedUser.name,
      matchedUserAvatar: matchedUser.avatar,
      matchedUserSkills: matchedUser.skills,
      matchedUserInterests: matchedUser.interests,
      matchedUserProject: matchedUser.currentProjects[0] || 'New Project',
    };
    const newMatches = [...matches, newMatch];
    setMatches(newMatches);
    localStorage.setItem('dev-match-matches', JSON.stringify(newMatches));
  };

  const removeMatch = (matchId: number) => {
    const newMatches = matches.filter(m => m.id !== matchId);
    setMatches(newMatches);
    localStorage.setItem('dev-match-matches', JSON.stringify(newMatches));
  };

  React.useEffect(() => {
    const stored = localStorage.getItem('dev-match-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser,
    matches,
    addMatch,
    removeMatch,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
