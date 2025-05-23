import React, { createContext, useContext, useState } from 'react';

// Default user values
const defaultUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4395.jpg',
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
