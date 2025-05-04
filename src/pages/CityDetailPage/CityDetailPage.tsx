import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {
    fetchWeatherByCityId,
    fetchHourlyForecastByCityId,
} from '../../redux/weatherSlice';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import './CityDetailPage.scss';

const CityDetailPage: React.FC = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { weatherData, hourlyForecasts } = useAppSelector(
        (state) => state.weather
    );

    const weather = weatherData[cityId || ''];
    const forecast = hourlyForecasts[cityId || ''] || [];

    useEffect(() => {
        if (cityId) {
            dispatch(fetchWeatherByCityId(cityId));
            dispatch(fetchHourlyForecastByCityId(cityId));
        }
    }, [cityId, dispatch]);

    if (!weather) {
        return <div>City not found or data is loading...</div>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="city_detail_page">
            <div className="header">
                <button
                    className="back_button"
                    title="Go Back"
                    onClick={handleGoBack}
                >
                    &larr;
                </button>
                <h1 className="city_title">
                    {weather.cityName} - Detailed information
                </h1>
            </div>
            <CurrentWeather weather={weather} />
            <TemperatureChart data={forecast} />
        </div>
    );
};

export default CityDetailPage;
