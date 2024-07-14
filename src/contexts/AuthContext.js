import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser, clearUser } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        console.log('User signed in:', user);
      } else {
        dispatch(clearUser());
        console.log('User signed out');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      console.log('Attempting to login with email:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      console.error('Failed to login:', error.message);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      console.log('Attempting to sign up with email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      console.log('User signed up:', userCredential.user);
      navigate('/dashboard'); // Navigate to dashboard on successful signup
    } catch (error) {
      console.error('Failed to sign up:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out');
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
