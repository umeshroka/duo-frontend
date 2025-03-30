// src/components/SignInForm.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { signIn } from '../services/authService';

const SignInForm = ({ onClose, onSuccess, switchToSignUp }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }

      // Attempt sign in
      const userData = await signIn(formData);
      setUser(userData);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={onClose}>×</button>
        <h2>Sign In</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div>
        <p>
          Don't have an account?{' '}
          <button onClick={switchToSignUp}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;