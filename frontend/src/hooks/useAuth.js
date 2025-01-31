import { useEffect, useState } from 'react'
import axios from 'axios';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    loading: true,
    role: null
  });

  const checkToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if(!accessToken) {
      setAuth({ isAuthenticated: false, loading: false });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/token/verify/`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setAuth({ 
          isAuthenticated: true,
          loading: false,
          role: response.data.role 
        });
      }
    } catch(error) {

      if (error.response?.status === 401 && refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/token/refresh/`,
            { refresh_token: refreshToken }
          );

          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            setAuth({
              isAuthenticated: true,
              loading: false,
              role: response.data.role
            });
          }
        } catch (refreshError) {
          console.error('Error al refrescar el Token', refreshError);
          setAuth({ 
            isAuthenticated: false,
            loading: false
          });
        }
      } else {
        console.error('Error al verificar el Token', error);
        setAuth({
          isAuthenticated: false,
          loading: false
        });
      }
    } 
  }
  
  useEffect(() => {
    checkToken();
  }, []);

  return auth;
};

