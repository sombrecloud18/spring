import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoginLayout } from '../components/layouts/login/login-layout.jsx';
import { MainPage } from '../components/containers/main-content.jsx';

const AuthLayout = () => (
  <>
    <main className="main">
      <MainPage />
    </main>
  </>
);

const AuthRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
    </Route>

    <Route element={<AuthRoute />}>
      <Route path="/main" element={<AuthLayout />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
