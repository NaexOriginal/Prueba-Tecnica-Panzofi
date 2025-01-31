import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import axios from "axios";

export const UserPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAuthenticated, loading, role } = useAuth();
  const [buttonClicks, setButtonClicks] = useState({ button1: 0, button2: 0 });

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

  const handleButtonClick = async (buttonNumber) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/button-click/`,
        { button_number: buttonNumber },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setButtonClicks((prev) => ({
        ...prev,
        [`button${buttonNumber}`]: prev[`button${buttonNumber}`] + 1,
      }));
    } catch (error) {
      console.error("Error al registar click:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-8">
      {role === "USER" || role === "ADMIN" ? (
        <div className="w-full max-w-5xl bg-white text-gray-900 shadow-lg rounded-lg p-10 flex flex-col items-center">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <img src="/logo.png" alt="Logo Panzofi" className="w-36" />
            </div>

            <div className="ml-6 flex-1">
              <h1 className="text-4xl font-bold">
                Bienvenid@ a <span className="text-black">Pan</span>
                <span className="text-red-600">z</span>
                <span className="text-black">ofi</span>
              </h1>
              <p className="text-gray-600 mt-4 text-lg">
                Aquí puedes interactuar con los botones y registrar actividad en
                la aplicación.
              </p>
            </div>
          </div>

          <div className="flex justify-between w-full mt-10">
            <button
              onClick={() => handleButtonClick(1)}
              className="bg-red-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Botón 1 ({buttonClicks.button1})
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-blue-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Botón 2 ({buttonClicks.button2})
            </button>
          </div>

          <div className="mt-10">
            <button
              onClick={logout}
              className="bg-gray-800 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-gray-900 transition duration-200"
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
