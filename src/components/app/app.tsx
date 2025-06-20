import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slices/ingredients/actions';
import { getUserThunk } from '../../services/slices/user/actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  // Первоначальная загрузка данных
  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserThunk());
  }, 

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