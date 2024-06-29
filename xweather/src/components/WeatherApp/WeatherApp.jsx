// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './WeatherApp.module.css'

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    const apiKey = '6f6eb8384b434231904100435242906';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    setLoading(true)
    setWeatherData(null);
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to fetch weather data")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className={styles['weather-cards']}>
          <div className={styles['weather-card']}>
            <h4>Temperature</h4>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className={styles['weather-card']}>
            <h4>Humidity</h4>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className={styles['weather-card']}>
            <h4>Condition</h4>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className={styles['weather-card']}>
            <h4>Wind Speed</h4>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
