import React from 'react';
import { WeatherData } from '../../types/interfaces';

interface CurrentWeatherProps {
    weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => (
    <section className="current_weather">
        <h2>Current weather</h2>
        <p>Temperature: {weather.temperature}°C</p>
        <p>Feels like: {weather.feelsLike}°C</p>
        <p>Description: {weather.description}</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind speed: {weather.windSpeed} m/s</p>
    </section>
);

export default CurrentWeather;
