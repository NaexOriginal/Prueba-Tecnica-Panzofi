import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const UserPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAuthenticated, loading, role } = useAuth();
  const [buttonClicks, setButtonClicks] = useState({ button1: 0, button2: 0 })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Cargando...</div> 
  }

  if (!isAuthenticated) {
    return <div>No tienes permisos para acceder a esta página.</div>
  }

  const handleButtonClick = async(buttonNumber) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/button-click/`,
        { button_number: buttonNumber },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        }
      );

      setButtonClicks((prev) => ({
        ...prev,
        [`button${buttonNumber}`]: prev[`button${buttonNumber}`] + 1,
      }));
    } catch (error) {
      console.error('Error al registar click:', error)
    }
  }

  return (
    <div>
      { role === 'USER' || role === 'ADMIN' ? (
        <div>
          <div>
            <img 
              src="/logo.png"
              alt="Logo Panzofi"
            />
          </div>

          <h1>Bienvenid@ a la App de Panzofi</h1>
          <p>Esta es una breve descripción de la aplicación. Aquí puedes incluir el uso de los Botones y el tiempo de registro en la Apliación</p>

          <div>
            <button onClick={() => handleButtonClick(1)}>Botón 1</button>
            <button onClick={() => handleButtonClick(2)}>Botón 2</button>
          </div>

          <div>
            <button onClick={logout}>Cerrar Sesión</button>
          </div>
        </div>
      ) : (
        <div>No tienes permisos para acceder a esta página</div>
      )}
    </div>
  )
}
