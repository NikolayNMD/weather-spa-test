import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {
    addCity,
    removeCity,
    loadSavedCities,
    fetchWeatherByCity,
} from '../../redux/weatherSlice';
import { WeatherApi } from '../../services/weatherApi';
import { City } from '../../types/interfaces';
import CitySearch from '../../components/CitySearch/CitySearch';
import CityList from '../../components/CityList/CityList';
import './WeatherHomePage.scss';

const WeatherHomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { cities, weatherData } = useAppSelector((state) => state.weather);

    useEffect(() => {
        dispatch(loadSavedCities());
    }, [dispatch]);

    useEffect(() => {
        cities.forEach((city) => {
            dispatch(fetchWeatherByCity(city));
        });
    }, [cities, dispatch]);

    const handleAddCity = async (cityName: string) => {
        try {
            const weather = await WeatherApi.fetchWeatherByCity(cityName);
            const newCity: City = {
                id: weather.id,
                name: weather.cityName,
                country: '',
            };
            dispatch(addCity(newCity));
        } catch (error) {
            console.error('Помилка додавання міста:', error);
        }
    };

    const handleRemoveCity = (cityId: string) => {
        dispatch(removeCity(cityId));
    };

    const handleRefreshCity = (city: City) => {
        dispatch(fetchWeatherByCity(city));
    };

    return (
        <div className="weather_app">
            <h1>Weather App</h1>
            <CitySearch onAddCity={handleAddCity} />
            <CityList
                cities={cities}
                weatherData={weatherData}
                onRemove={handleRemoveCity}
                onRefresh={handleRefreshCity}
            />
        </div>
    );
};

export default WeatherHomePage;
