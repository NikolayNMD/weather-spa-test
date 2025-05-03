export interface City {
    id: string;
    name: string;
    country: string;
}

export interface WeatherData {
    id: string;
    cityName: string;
    temperature: number;
    description: string;
    icon?: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
}

export interface HourlyForecast {
    time: string;
    temperature: number;
    icon?: string;
}