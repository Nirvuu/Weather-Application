import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
  
    try {
      const response = await axios.post('http://localhost:5001/signup', { username, email, password });
      if (response.data && response.data.user) {
        navigate('/login');
      } else {
        setError('Error creating account. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setError('Error creating account. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <div
        style={{
          width: '430px',
          height: '390px',
          padding: '38px',
          backgroundColor: 'white',
          borderRadius: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 'bolder', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
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
            Sign Up
          </button>
          <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '17px' }}>
            Already have an account?{' '}
            <button
              type="button" 
              onClick={() => navigate('/login')}
              style={{
                marginTop: '18px',
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
              Log in
            </button>
          </p>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
