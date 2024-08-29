import React, { useState, useEffect } from 'react';
import  { useNavigate, useLocation} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import './../Styles/GlobalStyles.css';

const HourlyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hourlyData } = location.state || {};
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    Cookies.remove('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        setUser({
          userId: decodedToken.userId,
          username: decodedToken.username,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    }
  }, []);



  if (!hourlyData || !Array.isArray(hourlyData) || hourlyData.length === 0) {
    return <div>No hourly data available</div>;
  }

  return (
    
    <div className="hourly-details">
      <h2>Hourly Forecast</h2>
      <div className="user-info-container">
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
        {user && (
          <div className="user-info">
            <span className="user-circle">{user.userId}</span>
            <div className="user-details">
              <span className="username">{user.username}</span>
              <span className="email">{user.email}</span>
            </div>
          </div>
        )}
      </div>
      {hourlyData.map((hour, index) => (
        <div key={index}>
          <p>Time: {hour.time}</p>
          <p>Temperature: {hour.temperature}°C</p>
          <p>Condition: {hour.condition.text}</p>
          <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
          <hr />
        </div>
      ))}
      <button className='gotopage' onClick={() => navigate('/weather')}>Go Back</button>
    </div>
  );
};

export default HourlyDetails;
