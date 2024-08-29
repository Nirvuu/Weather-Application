import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
      }}
      className="weather-app"
    >
      <h1
        style={{
          fontSize: '22px',
          fontWeight: 'bolder',
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          letterSpacing: '1px',
        }}
      >
        Welcome to Weather Application!
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#333',
          textAlign: 'center',
          marginBottom: '40px',
          lineHeight: '1.5',
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        Use this app to get accurate and up-to-date weather forecasts. Sign up if you don't have an account. If you already have an account, log in with your credentials.
      </p>
      <div style={{ display: 'flex' }} className="Showbutton">
        <button
          type="button"
          style={{
            width: '40%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3a00ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button
          type="button"
          style={{
            width: '40%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3a00ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
