import React from 'react';
import { City, WeatherData } from '../../types/interfaces';
import { useNavigate } from 'react-router-dom';
import './CityCard.scss';

interface CityCardProps {
    city: City;
    weatherData: WeatherData;
    onRemove: (cityId: string) => void;
    onRefresh: (city: City) => void;
}

const CityCard: React.FC<CityCardProps> = ({
    city,
    weatherData,
    onRemove,
    onRefresh,
}) => {
    const navigate = useNavigate();

    if (!weatherData) return null;

    const handleCardClick = () => {
        navigate(`/city/${city.id}`);
    };

    return (
        <div className="city_card" onClick={handleCardClick}>
            <div className="city_card__header">
                <h2>{weatherData.cityName}</h2>
                <div className="city_card__actions">
                    <button
                        className="city_card__button city_card__button--refresh"
                        title="Refresh"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRefresh(city);
                        }}
                    >
                        &#x21bb;
                    </button>
                    <button
                        className="city_card__button city_card__button--remove"
                        title="Remove"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(city.id);
                        }}
                    >
                        &times;
                    </button>
                </div>
            </div>
            <div className="city_card__main-info">
                <p>Temperature: {weatherData.temperature}°C</p>
                <p>{weatherData.description}</p>
            </div>
        </div>
    );
};

export default CityCard;
