import { AdminDashboard } from "../components/AdminDashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";

export const AdminPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAuthenticated, loading, role } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        No tienes permisos para acceder a esta página.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      {role === "ADMIN" ? (
        <div className="w-full max-w-6xl bg-white text-gray-900 shadow-lg rounded-lg p-10">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-black">Pan</span>
            <span className="text-red-600">z</span>
            <span className="text-black">ofi Admin Dashboard</span>
          </h1>
          <AdminDashboard />
          <div className="mt-8 text-center">
            <button
              onClick={logout}
              className="bg-red-600 text-white mt-10 py-3 px-8 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <div>No tienes permisos para acceder a esta página</div>
      )}
    </div>
  );
};
