import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/store.js';
import { Header } from './components/header/header.jsx';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { MainContent } from './pages/MainContent.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { PublicRoute } from './routes/PublicRoute.jsx';
import { navigationPoints } from './constants.js';
import './styles/style.css';
import './styles/fonts.css';

export const App = () => (
  <Provider store={store}>
    <Router>
      <div className="body">
        <Routes>
          <Route
            index
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <>
                  <Header navigationPoints={navigationPoints} />
                  <main className="main">
                    <MainContent />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  </Provider>
);
