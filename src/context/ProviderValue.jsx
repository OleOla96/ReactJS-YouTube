import { createContext, useState } from 'react';

const SideEffects = createContext();

export const ProviderValue = ({ children }) => {
  const [auth, setAuth] = useState({});

  // console.log('provider')

  const value = {
    auth,
    setAuth,
  };

  return <SideEffects.Provider value={value}>{children}</SideEffects.Provider>;
};

export default SideEffects;
