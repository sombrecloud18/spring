import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store.js';
import { AppRoutes } from './routes/router.jsx';
import './styles/style.css';
import './styles/fonts.css';

export const App = () => (
  <Provider store={store}>
    <Router>
      <div className="body">
        <AppRoutes />
      </div>
    </Router>
  </Provider>
);
