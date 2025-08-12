import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi, setAccessToken } from '../../../api/api.js';
import { loginSuccess } from '../../../redux/auth-actions.js';
import styles from './signup.module.css';

export const SignUpLayout = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setErrors({});

    try {
      const response = await authApi.signUp({
        username: formData.username,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
      });

      if (response.accessToken) {
        setAccessToken(response.accessToken);
        dispatch(loginSuccess(response.user));
        navigate('/main');
      }
    } catch (err) {
      if (err.response?.errors) {
        setErrors(err.response.errors);
      } else {
        setError(err.message || 'Registration error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Create your account</h2>
      {error && <p className={styles.error}>{error}</p>}
      {errors.general && <div className={styles.error}>{errors.general}</div>}
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            className={errors.username ? styles.errorInput : ''}
          />
          {errors.username && <div className={styles.errors}>{errors.username}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <div className={styles.errors}>{errors.password}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className={errors.repeatPassword ? styles.errorInput : ''}
          />
          {errors.repeatPassword && <div className={styles.errors}>{errors.repeatPassword}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
            className={errors.firstName ? styles.errorInput : ''}
          />
          {errors.firstName && <div className={styles.errors}>{errors.firstName}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
            className={errors.lastName ? styles.errorInput : ''}
          />
          {errors.lastName && <div className={styles.errors}>{errors.lastName}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            required
            className={errors.age ? styles.errorInput : ''}
          />
          {errors.age && <div className={styles.errors}>{errors.age}</div>}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.signupButton} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>

          <button type="button" className={styles.loginLink} onClick={goToLogin}>
            Already have an account? Log in
          </button>
        </div>
      </form>
    </div>
  );
};
