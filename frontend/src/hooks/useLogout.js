import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate('/')
  }

  return logout;
}