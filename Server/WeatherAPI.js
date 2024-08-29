const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = 'd04ce1e12f8e4cce8f492503240808';

app.get('/weather', async (req, res) => {
  const { name } = req.query;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Please provide a valid city name' });
  }

  try {
    const existingWeather = await prisma.weather.findUnique({
      where: { name }
    });

    if (existingWeather) {
      const localDate = new Date(existingWeather.lastUpdated).toDateString();
      const currentDate = new Date().toDateString();

      if (localDate === currentDate) {
        return res.json(existingWeather);
      }
    }
    
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}`);
    const data = response.data;

    const newWeatherData = {
      name: data.location.name,
      country: data.location.country,
      region: data.location.region,
      temp: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      wind: data.current.wind_kph,
      humidity: data.current.humidity,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      lastUpdated: new Date(data.current.last_updated),
    };

    const weather = await prisma.weather.upsert({
      where: { name },
      update: newWeatherData,
      create: newWeatherData
    });

    res.json(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/forecast', async (req, res) => {
  const { name } = req.query;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Please provide a valid city name' });
  }

  try {
    const existingForecast = await prisma.forecast.findUnique({
      where: { name }
    });

    if (existingForecast) {
      const localDate = new Date(existingForecast.lastUpdated).toDateString();
      const currentDate = new Date().toDateString();

      if (localDate === currentDate) {
        return res.json(existingForecast);
      }
    }

    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${name}&days=1`);
    const data = response.data;
    const newForecastData = {
      name: data.location.name,
      date: new Date(data.location.localtime.split(' ')[0]).toISOString(),
      maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
      minTemp: data.forecast.forecastday[0].day.mintemp_c,
      condition: data.forecast.forecastday[0].day.condition.text,
      icon: data.forecast.forecastday[0].day.condition.icon,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
      moonrise: data.forecast.forecastday[0].astro.moonrise,
      moonset: data.forecast.forecastday[0].astro.moonset,
      moonPhase: data.forecast.forecastday[0].astro.moon_phase,
      chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
      chanceOfSnow: data.forecast.forecastday[0].day.daily_chance_of_snow,
      hourly: data.forecast.forecastday[0].hour,
      lastUpdated: new Date(),
    };

    const forecast = await prisma.forecast.upsert({
      where: { name },
      update: newForecastData,
      create: newForecastData,
    });

    res.json(forecast);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
