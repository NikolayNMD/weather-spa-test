import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CityCard from './CityCard';
import { City, WeatherData } from '../../types/interfaces';

const mockCity: City = {
    id: '1',
    name: 'Lviv',
    country: 'Ukraine',
};

const mockWeatherData: WeatherData = {
    id: '1',
    cityName: 'Lviv',
    temperature: 23,
    description: 'overcust clouds',
    feelsLike: 23,
    humidity: 41,
    windSpeed: 7,
};

const mockOnRemove = jest.fn();
const mockOnRefresh = jest.fn();

const renderCityCard = () => {
    return render(
        <Router>
            <CityCard
                city={mockCity}
                weatherData={mockWeatherData}
                onRemove={mockOnRemove}
                onRefresh={mockOnRefresh}
            />
        </Router>
    );
};

describe('CityCard', () => {
    it('renders the city name and weather data', () => {
        renderCityCard();
        expect(screen.getByText('Lviv')).toBeInTheDocument();
        expect(screen.getByText('Temperature: 23°C')).toBeInTheDocument();
        expect(screen.getByText('overcust clouds')).toBeInTheDocument();
    });

    it('calls onRefresh when the refresh button is clicked', () => {
        renderCityCard();
        const refreshButton = screen.getByTitle('Refresh');
        fireEvent.click(refreshButton);
        expect(mockOnRefresh).toHaveBeenCalledWith(mockCity);
    });

    it('calls onRemove when the remove button is clicked', () => {
        renderCityCard();
        const removeButton = screen.getByTitle('Remove');
        fireEvent.click(removeButton);
        expect(mockOnRemove).toHaveBeenCalledWith(mockCity.id);
    });

    it('navigates to the city detail page when the card is clicked', () => {
        renderCityCard();
        const card = screen.getByText('Lviv');
        fireEvent.click(card);
        expect(window.location.pathname).toBe(
            `/weather-spa-test/city/${mockCity.id}`
        );
    });
});
