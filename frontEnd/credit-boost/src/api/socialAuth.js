import axiosInstance from "./axiosInstance";
import api from "./privateInstance";
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_PRODUCTION === 'true'
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

const redirectURL = import.meta.env.VITE_PRODUCTION === 'true'
  ? import.meta.env.VITE_PROD_REDIRECT_URL
  : import.meta.env.VITE_DEV_REDIRECT_URL;


export const verifyUserSession = async () => {
  const response = await api.post('jwt/verify/');
  return response.data;
};




export const socialAxiosInstance = axios.create({
  baseURL: baseURL, // Use the baseURL determined by the environment
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});


export const authenticateWithGoogle = async () => {
  try {
    const url = `${baseURL}/o/google-oauth2/?redirect_uri=${redirectURL}`;
    const res = await axiosInstance.get(url, {
      // headers: {
      //   Accept: 'application/json',
      // },
      // withCredentials: true,
    });

    // data = await res.json();

    if (res.status === 200 && typeof window !== 'undefined') {
      //window.location.replace(res.data.authorization_url);

      console.log('Full response:', res);
      console.log('auth url',res.data.authorization_url)
      setTimeout(() => {
        window.location.replace(res.data.authorization_url);
      }, 20000);

      //https://accounts.google.com/o/oauth2/auth?client_id=744704943921-ebcbuhh1u87re2mlmuc6jk2rv0pgip5e.apps.googleusercontent.com&redirect_uri=http://localhost:5173/auth/google&state=1B117UrBjgiBhvJeCmQhHNU5H8vD7fCp&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid+openid+email+profile
      
      
    } else {
      toast.error('Something went wrong');
    }
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong');
  }
};






