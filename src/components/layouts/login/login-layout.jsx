import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/auth-actions.js';
import { authApi, setAccessToken } from '../../../api/api.js';
import styles from './login.module.css';

export const LoginLayout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authApi.login({ username, password });
      if (data.success) {
        setAccessToken(data.accessToken);
        dispatch(loginSuccess(data.user));
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/main');
      } else {
        setError(data.message || 'Incorrect login or password');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login to Spring Projects</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Log In
        </button>
      </form>
    </div>
  );
};
