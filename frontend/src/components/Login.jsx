import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try { 
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login/`, {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('role', response.data.role);

        if (response.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setError('Credenciales Incorrectas');
      }
    } catch(error) {
      console.error(error.response || error);
      setError('Error al Iniciar Sesión');
    }
  }

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Correo</label>
          <input 
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Contraseña</label>
          <input 
            type='password' 
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        { error && <p style={{ color: 'red' }}> { error } </p> }
        <button type='submit'>Iniciar Sesión</button>
      </form>
    </div>
  )
}
