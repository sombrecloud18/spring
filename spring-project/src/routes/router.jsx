import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/header/header.jsx';
import { LoginPage } from '../pages/login/login-page.jsx';
import { MainContent } from '../pages/main-content.jsx';
import { navigationPoints } from '../constants.js';

const AuthLayout = () => (
  <>
    <Header navigationPoints={navigationPoints} />
    <main className="main">
      <MainContent />
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
      <Route index element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>

    <Route element={<AuthRoute />}>
      <Route path="/main" element={<AuthLayout />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
