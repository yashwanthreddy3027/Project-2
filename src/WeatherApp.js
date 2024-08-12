import React, { useState } from 'react';
import axios from 'axios';
// import './Weather.css'; // We'll create this file for styling
import './App.css'

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = '30d4741c779ba94c470ca1f63045390a'; // Replace with your actual API key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
            );
            setWeather(response.data);
            setError(null);
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <form onSubmit={handleSearch} className="form">
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className="input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;

