/* eslint-disable @typescript-eslint/no-shadow */
import React, {createContext, useContext, useState, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  userId: string | null;
  token: string | null;
  setUser: (id: string, token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setUser = (id: string, token: string) => {
    setUserId(id);
    setToken(token);
    // AsyncStorage.setItem('@user_token', token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    // AsyncStorage.removeItem('@user_token');
  };

  return (
    <AuthContext.Provider value={{userId, token, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
