import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      setUserToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUserToken(null);
    } catch (e) {
      console.log(e);
    }
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      setUserToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

