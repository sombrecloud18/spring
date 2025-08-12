import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LoginLayout } from '../components/layouts/login/login-layout.jsx';
import { MainLayout } from '../components/layouts/main-layout/main-layout.jsx';
import { SignUpLayout } from '../components/layouts/signup/signup-layout.jsx';
import { authApi, clearAuthData } from '../api/api.js';
import { loginSuccess } from '../redux/auth-actions.js';

const AuthRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { accessToken, user } = await authApi.refreshToken();
        dispatch(loginSuccess({ token: accessToken, user }));
      } catch (error) {
        console.error('Token refresh failed:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Или ваш лоадер
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const UnAuthRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/main" replace />;
};

export const AppRoutes = () => (
  <Routes>
    <Route element={<UnAuthRoute />}>
      <Route index element={<LoginLayout />} />
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/signup" element={<SignUpLayout />} />
    </Route>

    <Route element={<AuthRoute />}>
      <Route path="/main" element={<MainLayout />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
