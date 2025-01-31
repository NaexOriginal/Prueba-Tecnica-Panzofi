import { useUserData } from "../hooks/useUserData";
import { AdminCharts } from "./AdminCharts";

export const AdminDashboard = () => {
  const { users, loading, error } = useUserData();

  if (loading)
    return (
      <div className="flex justify-center items-center text-lg">
        Cargando usuarios...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-red-600 text-lg">
        Error al cargar datos
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto border border-gray-700 rounded-lg shadow-md custom-scrollbar">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left border-b border-gray-600">Email</th>
                <th className="px-6 py-3 text-left border-b border-gray-600">Inicio de Sesión</th>
                <th className="px-6 py-3 text-left border-b border-gray-600">Duración</th>
                <th className="px-6 py-3 text-center border-b border-gray-600">Botón 1</th>
                <th className="px-6 py-3 text-center border-b border-gray-600">Botón 2</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-600 ${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  } text-white hover:bg-gray-600 transition duration-200`}
                >
                  <td className="px-6 py-4 border-r border-gray-500">{user.email}</td>
                  <td className="px-6 py-4 border-r border-gray-500">{user.last_login || "Nunca"}</td>
                  <td className="px-6 py-4 border-r border-gray-500">
                    {user.session_duration ? `${user.session_duration}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center border-r border-gray-500">{user.button1_clicks}</td>
                  <td className="px-6 py-4 text-center">{user.button2_clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <AdminCharts />
      </div>
    </div>
  );
};
