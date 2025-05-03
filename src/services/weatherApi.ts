import axios from 'axios';
import { City, WeatherData, HourlyForecast } from '../types/interfaces';

const API_KEY = '09ff876027f65382bddc0c9b91813f0b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherApiClass {
    private handleError(error: Error, context: string): never {
        console.error(`${context} Error:`, error.message);
        throw error;
    }

    async fetchWeatherByCity(cityName: string): Promise<WeatherData> {
        try {
            const response = await axios.get(`${BASE_URL}/weather`, {
                params: {
                    q: cityName,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ua',
                },
            });

            const data = response.data;

            return {
                id: data.id.toString(),
                cityName: data.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
            };
        } catch (error) {
            return this.handleError(error as Error, 'Fail weather fetch!');
        }
    }

    async fetchWeatherByCityId(cityId: string): Promise<WeatherData> {
        try {
            const response = await axios.get(`${BASE_URL}/weather`, {
                params: {
                    id: cityId,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ua',
                },
            });

            const data = response.data;

            return {
                id: data.id.toString(),
                cityName: data.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
            };
        } catch (error) {
            return this.handleError(
                error as Error,
                'Fail weather fetch by ID!'
            );
        }
    }

    async fetchHourlyForecast(cityName: string): Promise<HourlyForecast[]> {
        try {
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    q: cityName,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ua',
                },
            });

            const forecasts = response.data.list
                .slice(0, 8)
                .map((forecast: any) => ({
                    time: forecast.dt_txt,
                    temperature: Math.round(forecast.main.temp),
                }));

            return forecasts;
        } catch (error) {
            return this.handleError(error as Error, 'Fail hourly forecast!');
        }
    }

    async fetchHourlyForecastByCityId(
        cityId: string
    ): Promise<HourlyForecast[]> {
        try {
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    id: cityId,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'ua',
                },
            });

            const data = response.data;

            const forecast = data.list.slice(0, 8).map((item: any) => ({
                time: item.dt_txt,
                temperature: Math.round(item.main.temp),
            }));

            return forecast;
        } catch (error) {
            return this.handleError(
                error as Error,
                'Fail hourly forecast fetch by ID!'
            );
        }
    }

    async searchCities(query: string): Promise<City[]> {
        try {
            const response = await axios.get(`${BASE_URL}/find`, {
                params: {
                    q: query,
                    type: 'like',
                    sort: 'population',
                    cnt: 5,
                    appid: API_KEY,
                },
            });

            const cities = response.data.list.map((city: any) => ({
                id: city.id.toString(),
                name: city.name,
                country: city.sys.country,
            }));

            return cities;
        } catch (error) {
            return this.handleError(error as Error, 'Fail search!');
        }
    }
}

export const WeatherApi = new WeatherApiClass();
