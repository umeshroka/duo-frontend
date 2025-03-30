// src/components/SignUpForm.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { signUp } from '../services/authService';

const SignUpForm = ({ onClose, onSuccess, switchToSignIn }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
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

      // Attempt sign up
      const userData = await signUp(formData);
      setUser(userData);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={onClose}>×</button>
        <h2>Create Account</h2>
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

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div>
        <p>
          Already have an account?{' '}
          <button onClick={switchToSignIn}>Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;