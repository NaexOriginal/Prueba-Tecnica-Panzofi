import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { AdminPage } from '../pages/AdminPage';
import { UserPage } from '../pages/UserPage';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/user' element={<UserPage />} />
    </Routes>
  )
}