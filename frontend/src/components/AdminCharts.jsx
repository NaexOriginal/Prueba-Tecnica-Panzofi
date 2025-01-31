import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useUserData } from "../hooks/useUserData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const AdminCharts = () => {
  const { users, loading, error } = useUserData();

  if (loading)
    return <div className="text-center text-lg">Cargando datos...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 text-lg">Error: {error}</div>
    );

  const filteredUsers = users.filter(
    (user) => user.session_duration && user.session_duration !== "N/A"
  );

  const buttonClicksData = {
    labels: users.map((user) => user.email),
    datasets: [
      {
        label: "Botón 1",
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
        data: users.map((user) => user.button1_clicks),
      },
      {
        label: "Botón 2",
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        data: users.map((user) => user.button2_clicks),
      },
    ],
  };

  const sessionDurationData =
    filteredUsers.length > 0
      ? {
          labels: filteredUsers.map((user) => user.email),
          datasets: [
            {
              label: "Duración de Sesión (min)",
              backgroundColor: [
                "#E63946",
                "#F4A261",
                "#2A9D8F",
                "#264653",
                "#E9C46A",
                "#8D99AE",
                "#6A0572",
                "#F77F00",
                "#3D348B",
                "#E76F51",
              ],
              borderColor: "#fff",
              borderWidth: 1,
              data: filteredUsers.map(
                (user) => parseFloat(user.session_duration) || 1
              ),
            },
          ],
        }
      : {
          labels: ["Sin datos"],
          datasets: [
            {
              label: "Duración de Sesión",
              backgroundColor: ["#ccc"],
              data: [1],
            },
          ],
        };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analíticas de Usuarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center w-[500px] h-[350px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Clics en Botones
          </h3>
          <div className="w-full h-full">
            <Bar
              data={buttonClicksData}
              options={{
                indexAxis: "y",
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#333" } },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#333",
                      beginAtZero: true,
                    },
                  },
                  y: {
                    ticks: {
                      color: "#333",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center w-[350px] h-[350px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Duración de Sesión
          </h3>
          <div className="w-full h-full">
            <Pie
              data={sessionDurationData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#333" } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
