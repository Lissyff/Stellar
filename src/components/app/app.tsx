import { ConstructorPage } from '@pages';
import { Feed } from '@pages/feed';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { ForgotPassword } from '@pages/forgot-password';
import { ResetPassword } from '@pages/reset-password';
import { Profile } from '@pages/profile';
import { ProfileOrders } from '@pages/profile-orders';
import { NotFound404 } from '@pages/not-found';
import { IngredientsDetails } from '@components/ingredients-details';
import { OrderInfo } from '@components/order-info';
import { Modal } from '@components/modal';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { FC } from 'react';

// Компонент для модальных окон с возможностью возврата назад
const ModalRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal onClose={handleClose}>
      {children}
    </Modal>
  );
};

const App = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes location={background || location}>
          {/* Основные маршруты */}
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/feed" element={<Feed />} />
          
          {/* Маршруты с модальными окнами */}
          <Route path="/feed/:number" element={<OrderInfo />} />
          <Route path="/ingredients/:id" element={<IngredientsDetails />} />
          
          {/* Защищённые маршруты */}
          <Route path="/login" element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
          <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
          <Route path="/profile/orders/:number" element={<ProtectedRoute><OrderInfo /></ProtectedRoute>} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {/* Рендерим модальные окна поверх основного контента */}
        {background && (
          <Routes>
            <Route
              path="/feed/:number"
              element={
                <ModalRoute>
                  <OrderInfo />
                </ModalRoute>
              }
            />
            <Route
              path="/ingredients/:id"
              element={
                <ModalRoute>
                  <IngredientsDetails />
                </ModalRoute>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <ModalRoute>
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                </ModalRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;