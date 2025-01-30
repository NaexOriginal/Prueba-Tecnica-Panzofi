import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { useEffect } from 'react';

export const UserPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAuthenticated, loading, role } = useAuth();

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

  const handleButtonClick = (message) => {
    console.log(message);
  }

  return (
    <div>
      { role === 'USER' || role === 'ADMIN' ? (
        <div>
          <div>
            <img 
              src="/logo.png"
              alt="Logo Panzofi"
              sizes="5"
            />
          </div>

          <h1>Bienvenid@ a la App de Panzofi</h1>
          <p>Esta es una breve descripción de la aplicación. Aquí puedes incluir el uso de los Botones y el tiempo de registro en la Apliación</p>

          <div>
            <button onClick={() => handleButtonClick('Botón 1 presionado')}>Botón 1</button>
            <button onClick={() => handleButtonClick('Botón 2 presionado')}>Botón 2</button>
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
