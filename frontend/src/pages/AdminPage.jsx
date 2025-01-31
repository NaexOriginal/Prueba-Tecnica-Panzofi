import { AdminDashboard } from '../components/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { useEffect } from 'react';

export const AdminPage = () => {
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
  

  return (
    <div>
      { role === 'ADMIN' ? (
        <div>
          <h1>Admin Dashboard</h1>
          <AdminDashboard />
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>No tienes permisos para acceder a esta página</div>
      )}
    </div>
  )
}
