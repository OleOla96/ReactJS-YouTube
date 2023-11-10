import { createContext, useState } from 'react';

const SideEffects = createContext();

export const ProviderValue = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

  const value = {
    auth,
    setAuth,
    avatar,
    setAvatar,
  };

  return <SideEffects.Provider value={value}>{children}</SideEffects.Provider>;
};

export default SideEffects;
