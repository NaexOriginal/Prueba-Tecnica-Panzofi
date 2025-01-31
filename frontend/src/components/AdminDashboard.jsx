import { useUserData } from '../hooks/useUserData';
import { AdminCharts } from './AdminCharts';

export const AdminDashboard = () => {
  const { users, loading, error } = useUserData();

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: </div>;

  return (
    <div>
      <h2>Usuarios Registrados</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Inicio de Sesión</th>
            <th>Duración</th>
            <th>Botón 1</th>
            <th>Botón 2</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{ user.email }</td>
              <td>{ user.last_login || 'Nunca' }</td>
              <td>{ user.session_duration ? `${ user.session_duration } min` : 'N/A' }</td>
              <td>{ user.button1_clicks }</td>
              <td>{ user.button2_clicks }</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminCharts />
    </div>
  );
};
