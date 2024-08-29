import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import './../Styles/GlobalStyles.css';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecastCity, setForecastCity] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [forecastError, setForecastError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [showCompleteInfo, setShowCompleteInfo] = useState({});
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a valid city name for Current Weather');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:5000/weather', {
        params: { name: city },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeather(response.data);
      setShowWeather(true);
    } catch (err) {
      setError('Weather data not found for the provided city name');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async () => {
    if (!forecastCity.trim()) {
      setForecastError('Please enter a valid city name for Current Forecast');
      return;
    }

    setLoading(true);
    setForecastError(null);
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:5000/forecast', {
        params: { name: forecastCity },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForecastData(response.data);
      setShowForecast(true);
    } catch (err) {
      setForecastError('Forecast data not found for the provided city name');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchWeather();
  const handleForecastSearch = () => fetchForecastData();
  const handleShowHourlyDetails = (hourlyData) => navigate('/hourly', { state: { hourlyData } });
  const handleRefresh = () => {
    setShowWeather(false);
    setShowCompleteInfo({});
  };

  const handleShowCompleteInfo = (date) => {
    setShowCompleteInfo((prevInfo) => ({
      ...prevInfo,
      [date]: !prevInfo[date],
    }));
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="weather-app-container">
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
      <div className="weather-app">
        <div className='span'>Welcome to Weather App</div>
        <div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Current Weather</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showWeather && weather && <WeatherDetails weather={weather} />}
        {showWeather && <button onClick={handleRefresh}>Hide Details</button>}

        <div>
          <input
            type="text"
            value={forecastCity}
            onChange={(e) => setForecastCity(e.target.value)}
            placeholder="Enter city name for forecast"
          />
          <button onClick={handleForecastSearch}>Current Forecast</button>
        </div>
        {showForecast && forecastData && (
          <ForecastDetails
            forecastData={forecastData}
            onShowCompleteInfo={handleShowCompleteInfo}
            onShowHourlyDetails={handleShowHourlyDetails}
            showCompleteInfo={showCompleteInfo}
          />
        )}
        {forecastError && <p style={{ color: 'red' }}>{forecastError}</p>}
      </div>
    </div>
  );
};

const WeatherDetails = ({ weather }) => {
  if (!weather) {
    return <p>Error: Invalid weather data</p>;
  }

  const formattedLastUpdated = new Date(weather.lastUpdated).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      <h2>{weather.name}, {weather.country}</h2>
      <p>Condition: {weather.condition}</p>
      <img src={`https:${weather.icon}`} alt={weather.condition} />
      <p>Temperature: {weather.temp}°C</p>
      <p>Feels Like: {weather.feelsLike}°C</p>
      <p>Wind: {weather.wind} kph</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Last Updated: {formattedLastUpdated}</p>
    </div>
  );
};

const ForecastDetails = ({ forecastData, onShowCompleteInfo, onShowHourlyDetails, showCompleteInfo }) => {
  if (!forecastData) {
    return <p>Error: Invalid forecast data</p>;
  }

  const formattedDate = new Date(forecastData.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <h3>Forecast for {forecastData.name}</h3>
      <div>
        <p>Date: {formattedDate}</p>
        <p>Max Temp: {forecastData.maxTemp}°C</p>
        <p>Min Temp: {forecastData.minTemp}°C</p>
        <p>Condition: {forecastData.condition}</p>
        <img src={`https:${forecastData.icon}`} alt={forecastData.condition} />
        <div className='Showbutton'>
          <button onClick={() => onShowCompleteInfo(forecastData.date)}>
            {showCompleteInfo[forecastData.date] ? `Hide Details of ${formattedDate}` : `Details of ${formattedDate}`}
          </button>
          <button onClick={() => onShowHourlyDetails(forecastData.hourly)}>Hourly Forecast</button>
        </div>
        {showCompleteInfo[forecastData.date] && (
          <div>
            <p>Sunrise: {forecastData.sunrise}</p>
            <p>Sunset: {forecastData.sunset}</p>
            <p>Moonrise: {forecastData.moonrise}</p>
            <p>Moonset: {forecastData.moonset}</p>
            <p>Moon Phase: {forecastData.moonPhase}</p>
            <p>Chance of Rain: {forecastData.chanceOfRain}%</p>
            <p>Chance of Snow: {forecastData.chanceOfSnow}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
