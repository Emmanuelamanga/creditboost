import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { verifyUserSession } from '../api/socialAuth';
import api from '../api/privateInstance';

const cookies = new Cookies();


function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error("Error parsing JSON from localStorage", error);
      return null; // or handle the error appropriately
    }
  } else {
    return null; // or handle the missing item case
  }
}

function setToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

//session

function getFromSessionStorage(key) {
  const item = sessionStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error("Error parsing JSON from sessionStorage", error);
      return null; // or handle the error appropriately
    }
  } else {
    return null; // or handle the missing item case
  }
}


function setToSessionStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to sessionStorage", error);
  }
}



// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const [name, setName] = useState(getFromLocalStorage('name', ''));
  const [email, setUserEmail] = useState(getFromLocalStorage('email', ''));
  const [message, setMessage] = useState('');
  const [updatedProfile, setUpdatedProfile] = useState(getFromLocalStorage('updatedProfile', false))

  
  const navigate = useNavigate();
  const [learningContent, setLearningContent] = useState(getFromLocalStorage('learningContent', []))
  const [userProgress, setUserProgress] = useState(getFromLocalStorage('userProgress', null));


  useEffect(() => {
    setToLocalStorage('name', name);
  }, [name]);

  useEffect(() => {
    setToLocalStorage('email', email);
  }, [email]);

  useEffect(() => {
    setToLocalStorage('updatedProfile', updatedProfile);
  }, [updatedProfile]);

  useEffect(() => {
    setToLocalStorage('learningContent', learningContent);
  }, [learningContent]);

  useEffect(() => {
    setToLocalStorage('userProgress', userProgress);
  }, [userProgress]);

  

  //check authentication
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await verifyUserSession();
  //       setIsAuthenticated(true);
  //     } catch {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);



  const logout = async () => {

    try {
      const response = await api.post('logout/',
      );

      if (response.status === 205) {
        // Clear cookies
        cookies.remove('access_token', { path: '/' });
        cookies.remove('refresh_token', { path: '/' });
        setName('');

      }

    } catch (error) {
      setMessage('Logout failed')
      console.error('Logout failed:', error);
    } finally {
      localStorage.clear()
      //clear other chat variables
      setThreadId(null)
      setChatId(null)
      setSessionId(null)
      setMessages([]);
      navigate('/');

    }
  };



  const newChat = () => {
    //setChatHistory([]);
    setThreadId(null)
    setChatId(null)
    setSessionId(null)
    setMessages([]);
  }

  return (
    <AppContext.Provider value={{
      isAuthenticated, setIsAuthenticated,name, setName, logout, updatedProfile, setUpdatedProfile,
      email, setUserEmail,learningContent, setLearningContent,userProgress, setUserProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};
