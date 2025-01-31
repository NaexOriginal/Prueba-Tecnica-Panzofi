import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/");
  };

  return logout;
};
