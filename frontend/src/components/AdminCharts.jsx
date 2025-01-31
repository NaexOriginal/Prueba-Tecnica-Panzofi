import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useUserData } from '../hooks/useUserData';

// Registrar los módulos de Chart.js
ChartJS.register(
  CategoryScale, // Para las escalas de tipo categoría
  LinearScale,   // Para escalas lineales
  BarElement,    // Para los gráficos de barras
  Title,
  Tooltip,
  Legend,
  ArcElement     // Para gráficos de pastel (Pie charts)
);

export const AdminCharts = () => {
  const { users, loading, error } = useUserData();

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  const buttonClicksData = {
    labels: users.map(user => user.email),
    datasets: [
      {
        label: 'Botón 1',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        data: users.map(user => user.button1_clicks),
      },
      {
        label: 'Botón 2',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        data: users.map(user => user.button2_clicks),
      },
    ],
  };

  const sessionDurationData = {
    labels: users.map(user => user.email),
    datasets: [
      {
        label: 'Duración de Sesión (min)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        data: users.map(user => user.session_duration || 0),
      },
    ],
  };

  return (
    <div>
      <h2>Analíticas de Usuarios</h2>
      <div>
        <h3>Clics en Botones</h3>
        <Bar data={buttonClicksData} />
      </div>
      <div>
        <h3>Duración de Sesión</h3>
        <Pie data={sessionDurationData} />
      </div>
    </div>
  );
};
