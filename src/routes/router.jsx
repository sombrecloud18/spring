import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LoginLayout } from '../components/layouts/login/login-layout.jsx';
import { MainLayout } from '../components/layouts/main-layout/main-layout.jsx';
import { SignUpLayout } from '../components/layouts/signup/signup-layout.jsx';
import { authApi, clearAuthData } from '../api/api.js';

const AuthRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No token');
        await authApi.refreshToken();
      } catch (err) {
        console.error(err);
        clearAuthData();
        navigate('/login');
      }
    };

    if (!isAuthenticated) {
      checkToken();
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
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
