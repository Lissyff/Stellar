// src/components/protected-route/protected-route.tsx
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { selectUser } from '../../services/slices/authSlice';

interface IProtectedRoute {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ onlyUnAuth = false, children }) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но маршрут только для неавторизованных
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    // Маршрут защищён, но пользователь не авторизован
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Все проверки пройдены
  return <>{children}</>;
};