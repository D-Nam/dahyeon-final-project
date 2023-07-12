import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const initialUser = sessionStorage.getItem('user');
  const [signedInUser_id, setSignedInUser_id] = useState(
    initialUser ? JSON.parse(initialUser) : null
  );

  return (
    <UserContext.Provider value={{ signedInUser_id, setSignedInUser_id }}>
      {children}
    </UserContext.Provider>
  );
};
