import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../components/header/header.jsx';
import { LoginPage } from '../pages/login/login-page.jsx';
import { MainContent } from '../pages/main-content.jsx';
import { navigationPoints } from '../constants.js';

const AuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const UnAuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/main" replace /> : children;
};

export const AppRoutes = () => (
  <Routes>
    <Route
      index
      element={
        <UnAuthRoute>
          <LoginPage />
        </UnAuthRoute>
      }
    />
    <Route
      path="/login"
      element={
        <UnAuthRoute>
          <LoginPage />
        </UnAuthRoute>
      }
    />
    <Route
      path="/main"
      element={
        <AuthRoute>
          <>
            <Header navigationPoints={navigationPoints} />
            <main className="main">
              <MainContent />
            </main>
          </>
        </AuthRoute>
      }
    />
  </Routes>
);
