import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      const token = response.data.token;

      // Store the JWT token in a session cookie
      document.cookie = `token=${token}; path=/; secure; samesite=strict`;

      // Redirect to /weather on successful login
      navigate('/weather');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '410px',
          height:'260px',
          padding: '40px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 'bolder', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
          Login to your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '15px',
              boxSizing: 'border-box',
            }}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '20px',
              boxSizing: 'border-box',
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
