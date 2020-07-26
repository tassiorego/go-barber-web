import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: object;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('CompreLocal@token');
    const user = localStorage.getItem('CompreLocal@user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('CompreLocal@token', token);
    localStorage.setItem('CompreLocal@user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('CompreLocal@token');
    localStorage.removeItem('CompreLocal@user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
