import { AdminDashboard } from '../components/admin/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export const AdminPage = () => {
  const navigate = useNavigate();
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
      <h1>Admin Dashboard</h1>

      { role === 'ADMIN' ? (
        <AdminDashboard />
      ) : (
        <div>No tienes permisos para acceder a esta página</div>
      )}
      <AdminDashboard />
    </div>
  )
}
